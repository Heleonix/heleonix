/* eslint-disable import/no-default-export */
/* eslint-disable import/no-dynamic-require */
import path from 'path';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

// module => Module
// module-name => ModuleName
// @namespace/module-name => Namespace.ModuleName
const getModuleNameFromModuleId = moduleId =>
  moduleId
    .replace(/@./, s => s[1].toUpperCase())
    .replace(/\/./, s => `.${s[1].toUpperCase()}`)
    .replace(/-./, s => s[1].toUpperCase())
    .replace(/^./, s => s[0].toUpperCase());

const { LERNA_PACKAGE_NAME } = process.env;
const NAME = getModuleNameFromModuleId(LERNA_PACKAGE_NAME);
const PACKAGE_ROOT_PATH = process.cwd();
const PACKAGE_JSON = require(path.join(PACKAGE_ROOT_PATH, 'package.json'));
const INPUT = path.join(PACKAGE_ROOT_PATH, 'src/index.js');
const EXTERNAL = [...Object.keys(PACKAGE_JSON.dependencies || {}), ...Object.keys(PACKAGE_JSON.peerDependencies || {})];
const GLOBALS = [...Object.keys(PACKAGE_JSON.peerDependencies || {})].reduce(
  (result, val) => ({ ...result, [val]: getModuleNameFromModuleId(val) }),
  {}
);

const isExternal = id => EXTERNAL.some(item => id.startsWith(item));

export default [
  {
    input: INPUT,
    output: { format: 'cjs', file: path.join(PACKAGE_ROOT_PATH, `dist/index.cjs.js`) },
    external: isExternal,
    plugins: [
      babel({
        babelrc: false,
        presets: [['@babel/preset-env']],
        plugins: [['@babel/plugin-transform-runtime', { corejs: 3 }]],
        runtimeHelpers: true,
        exclude: /node_modules/
      }),
      sizeSnapshot()
    ]
  },
  {
    input: INPUT,
    output: { format: 'esm', file: path.join(PACKAGE_ROOT_PATH, `dist/index.esm.js`) },
    external: isExternal,
    plugins: [
      babel({
        babelrc: false,
        presets: [['@babel/preset-env']],
        plugins: [['@babel/plugin-transform-runtime', { corejs: 3, useESModules: true }]],
        runtimeHelpers: true,
        exclude: /node_modules/
      }),
      sizeSnapshot()
    ]
  },
  {
    input: INPUT,
    output: {
      format: 'umd',
      file: path.join(PACKAGE_ROOT_PATH, `dist/index.umd.min.js`),
      name: NAME,
      amd: {
        id: NAME
      },
      globals: GLOBALS
    },
    plugins: [
      babel({
        babelrc: false,
        presets: [['@babel/preset-env']],
        plugins: [['@babel/plugin-transform-runtime', { corejs: 3, regenerator: false, useESModules: true }]],
        runtimeHelpers: true,
        exclude: /node_modules/
      }),
      nodeResolve(),
      commonjs({ include: /node_modules/ }),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      sizeSnapshot(),
      terser()
    ]
  }
];
