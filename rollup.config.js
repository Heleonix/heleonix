/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-default-export */
/* eslint-disable no-undef */
import path from "path";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import typescript2 from "rollup-plugin-typescript2";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

// module => Module
// module-name => ModuleName
// @namespace/module-name => Namespace.ModuleName
const getModuleNameFromModuleId = (moduleId) =>
    moduleId
        .replace(/@./, (s) => s[1].toUpperCase())
        .replace(/\/./, (s) => `.${s[1].toUpperCase()}`)
        .replace(/-./, (s) => s[1].toUpperCase())
        .replace(/^./, (s) => s[0].toUpperCase());
const { LERNA_PACKAGE_NAME } = process.env;
const MODULE_NAME = getModuleNameFromModuleId(LERNA_PACKAGE_NAME);
const PACKAGE_ROOT_PATH = process.cwd();
const PACKAGE_JSON = require(path.join(PACKAGE_ROOT_PATH, "package.json"));
const INPUT_FILE = path.join(PACKAGE_ROOT_PATH, "src/index.ts");
const TS_CONFIG_OVERRIDE = {
    compilerOptions: {
        baseUrl: null,
        paths: null,
    },
    include: [`${PACKAGE_ROOT_PATH}/src/**/*`],
};
const EXTERNALS = [
    ...Object.keys(PACKAGE_JSON.dependencies || {}),
    ...Object.keys(PACKAGE_JSON.peerDependencies || {}),
];
const GLOBALS = [...Object.keys(PACKAGE_JSON.peerDependencies || {})].reduce(
    (result, val) => ({ ...result, [val]: getModuleNameFromModuleId(val) }),
    {},
);

const isExternal = (id) => EXTERNALS.some((item) => id.startsWith(item));

export default [
    {
        input: INPUT_FILE,
        output: {
            format: "cjs",
            exports: "named",
            file: path.join(PACKAGE_ROOT_PATH, PACKAGE_JSON.main),
        },
        external: isExternal,
        plugins: [
            nodeResolve(),
            commonjs(),
            typescript2({
                typescript: require("typescript"),
                tsconfig: "../../tsconfig.json",
                tsconfigOverride: TS_CONFIG_OVERRIDE,
            }),
            babel({
                configFile: "../../babel.config.json",
                extensions: [".ts"],
                babelHelpers: "runtime",
            }),
        ],
    },
    {
        input: INPUT_FILE,
        output: {
            format: "esm",
            exports: "named",
            file: path.join(PACKAGE_ROOT_PATH, PACKAGE_JSON.module),
        },
        external: isExternal,
        plugins: [
            nodeResolve(),
            commonjs(),
            typescript2({
                typescript: require("typescript"),
                tsconfig: "../../tsconfig.json",
                tsconfigOverride: TS_CONFIG_OVERRIDE,
            }),
            babel({
                configFile: "../../babel.config.json",
                extensions: [".ts"],
                babelHelpers: "runtime",
            }),
        ],
    },
    {
        input: INPUT_FILE,
        output: {
            format: "umd",
            file: path.join(PACKAGE_ROOT_PATH, PACKAGE_JSON.browser),
            name: MODULE_NAME,
            amd: {
                id: MODULE_NAME,
            },
            globals: GLOBALS,
        },
        plugins: [
            nodeResolve(),
            commonjs(),
            typescript2({
                typescript: require("typescript"),
                tsconfig: "../../tsconfig.json",
                tsconfigOverride: TS_CONFIG_OVERRIDE,
            }),
            babel({
                configFile: "../../babel.config.json",
                extensions: [".ts"],
                babelHelpers: "runtime",
            }),
            replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
            terser(),
        ],
    },
];
