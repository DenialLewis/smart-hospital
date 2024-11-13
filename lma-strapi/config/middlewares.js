module.exports = [
  {
    name: 'strapi::logger',
    resolve: 'strapi::logger',
    config: {}
  },
  {
    name: 'strapi::errors',
    resolve: 'strapi::errors',
    config: {}
  },
  {
    name: 'strapi::security',
    resolve: 'strapi::security',
    config: {}
  },
  {
    name: 'strapi::cors',
    resolve: 'strapi::cors',
    config: {
      enabled: true,
      origin: ['http://localhost:8080'], // Allow access from your Vue.js app
      headers: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
    }
  },
  {
    name: 'strapi::poweredBy',
    resolve: 'strapi::poweredBy',
    config: {}
  },
  {
    name: 'strapi::query',
    resolve: 'strapi::query',
    config: {}
  },
  {
    name: 'strapi::body',
    resolve: 'strapi::body',
    config: {}
  },
  {
    name: 'strapi::session',
    resolve: 'strapi::session',
    config: {}
  },
  {
    name: 'strapi::favicon',
    resolve: 'strapi::favicon',
    config: {}
  },
  {
    name: 'strapi::public',
    resolve: 'strapi::public',
    config: {}
  }
];
