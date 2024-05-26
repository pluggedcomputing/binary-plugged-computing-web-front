const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'https://activities.a4s.dev.br',
    secure: false,
    logLevel: 'debug',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  }
];

module.exports = PROXY_CONFIG;
