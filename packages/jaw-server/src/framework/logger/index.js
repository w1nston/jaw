'use strict';
const winston = require('winston');
const getTime = require('date-fns/get_time');
const format = require('date-fns/format');

const timestamp = () => {
  const now = new Date();
  return getTime(now);
}

const fileInfoTransport = new winston.transports.File({
  filename: './logs/info.log',
  level: 'info',
});

const fileErrorTransport = new winston.transports.File({
  filename: './logs/error.log',
  level: 'error',
});

const logger = winston.createLogger({
  format: winston.format.printf(info => {
    return `[${format(timestamp(), 'YYYY-MM-DD HH:mm:ss')}][${info.level.toUpperCase()}] ${info.message}`;
  }),
  transports: [fileInfoTransport, fileErrorTransport],
  exitOnError: false,
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console());
}

module.exports = { logger };
