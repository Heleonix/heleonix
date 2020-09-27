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

const MODULE_NAME = getModuleNameFromModuleId(process.env.LERNA_PACKAGE_NAME);
const PACKAGE_ROOT_PATH = process.cwd();
const PACKAGE_JSON = require(path.join(PACKAGE_ROOT_PATH, "package.json"));
const EXTERNALS = [
    ...Object.keys(PACKAGE_JSON.dependencies || {}),
    ...Object.keys(PACKAGE_JSON.peerDependencies || {}),
];
const GLOBALS = [...Object.keys(PACKAGE_JSON.peerDependencies || {})].reduce(
    (result, val) => ({ ...result, [val]: getModuleNameFromModuleId(val) }),
    {},
);

function config(format, moduleName, outputFile, external, globals, extraPlugins) {
    return {
        input: "./src/index.ts",
        output: {
            format: format,
            name: moduleName,
            exports: "named",
            file: outputFile,
            globals: globals,
            amd: {
                id: moduleName,
            },
            sourcemap: true,
        },
        external: external,
        plugins: [
            nodeResolve(),
            commonjs(),
            typescript2({
                tsconfig: "tsconfig.lib.json",
                typescript: require("typescript"),
                tsconfigOverride: {
                    include: [`${PACKAGE_ROOT_PATH}/src/**/*`],
                },
            }),
            babel({
                rootMode: "upward",
                extensions: [".ts"],
                babelHelpers: "runtime",
            }),
            ...(extraPlugins || []),
        ],
    };
}

export default [
    config("cjs", null, PACKAGE_JSON.main, (id) => EXTERNALS.some((item) => id.startsWith(item)), null, null),
    config("esm", null, PACKAGE_JSON.module, (id) => EXTERNALS.some((item) => id.startsWith(item)), null, null),
    config("umd", MODULE_NAME, PACKAGE_JSON.browser, null, GLOBALS, [
        replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
        terser({
            mangle: false,
        }),
    ]),
];
