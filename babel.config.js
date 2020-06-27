module.exports = api => {
  api.cache(true);

  return {
    presets: ['@babel/preset-env'],
    plugins: [
      ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: false }],
      '@babel/plugin-proposal-private-methods',
      '@babel/plugin-proposal-class-properties',
      ['@babel/plugin-transform-runtime', { corejs: 3 }]
    ],
    exclude: /node_modules/
  };
};
