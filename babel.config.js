module.exports = api => {
  api.cache(true);

  return {
    presets: ['@babel/preset-env'],
    plugins: [
      ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: false }],
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-private-methods',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-null-coalescing-operator',
      ['@babel/plugin-transform-runtime', { corejs: { version: 3, proposals: true } }],
    ],
    exclude: /node_modules/,
  };
};
