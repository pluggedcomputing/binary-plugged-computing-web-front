const PROXY_CONFIG = [
    {
      context: ['/api'],
      target: 'http://api.observatorioturismopb.com.br:8383/',
      secure: false,
      logLevel: 'debug'
    }
  ];
  
  module.exports = PROXY_CONFIG;