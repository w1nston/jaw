'use strict';
const { createExpressServer } = require('./src/framework/expressServer');

const server = createExpressServer();
server.start();
