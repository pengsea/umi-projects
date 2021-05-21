// ref: https://umijs.org/config/
export default {
  dynamicImport: {  },
  title: 'pengsea',
  hash: true,
  history: { type:'hash' },
  publicPath: './',
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  targets: {
    chrome: 79,
    firefox: false,
    safari: false,
    edge: false,
    ios: false,
  },
};
