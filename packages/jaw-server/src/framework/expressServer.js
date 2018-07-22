'use strict';
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const { logger } = require('./logger');

const PORT = process.env.PORT || 4000;

const createExpressServer = () => {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(compression());

  return {
    start: () => {
      app.get('/', (request, response) => {
        // TODO: serve static content
        response.status(200).send();
      });

      app.get('/projects', (request, response) => {
        // TODO: serve static content
        response.status(200).send();
      });

      const server = app.listen(PORT, () => {
        logger.info(`Server started. Listening on port ${PORT}.`);
        if (process.send && typeof process.send === 'function') {
          process.send('ready');
        }
      });

      process.on('SIGINT', () => {
        logger.info('SIGINT signal received. Prepare shutdown...');

        server.close(error => {
          if (error) {
            logger.error('Failed to gracefully shutdown server!', error);
            process.exit(1);
          }
          process.exit(0);
        });
      });
    },
  };
};

module.exports = {
  createExpressServer,
};
