const PROXY_CONFIG = [
    {
      context: ['/api'],
      target: 'https://activities.a4s.dev.br/api',
      secure: false,
      logLevel: 'debug'
    }
  ];
  
  module.exports = PROXY_CONFIG;