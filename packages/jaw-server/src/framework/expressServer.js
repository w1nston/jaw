'use strict';
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const { logger } = require('./logger');

const PORT = process.env.PORT || 4000;

const createExpressServer = () => {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(compression());
  app.use(express.static('public'));

  const publicDirectory = path.join(__dirname, '../../public');
  const indexHtml = path.join(publicDirectory, 'index.html');
  const upsndownsHtml = path.join(`${publicDirectory}/upsndowns`, 'index.html');
  const punkFoodHtml = path.join(`${publicDirectory}/punkFood`, 'index.html');

  return {
    start: () => {
      app.get('/', (request, response) => {
        response.status(200).sendFile(indexHtml);
      });

      app.get('/projects/punk-food', (request, response) => {
        response.status(200).sendFile(punkFoodHtml);
      });

      app.get('/projects/upsndowns', (request, response) => {
        response.status(200).sendFile(upsndownsHtml);
      });

      app.get('/projects', (request, response) => {
        response.status(200).sendFile(indexHtml);
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
