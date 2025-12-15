const { defineConfig } = require('cypress');
require('dotenv').config();

// const protocol = (process.env.APP_ENV === 'production') ? 'https' : 'http';

module.exports = defineConfig({
  screenshotOnRunFailure: false, 
  e2e: {
    setupNodeEvents(on, config) {
      if (process.env.APP_ENV === 'production') throw new Error('The environment is running in production; it is not possible to run tests in production..');
      return config;
    },
    baseUrl: process.env.BASE_URL,
    defaultCommandTimeout: 30000,  
  },
});
