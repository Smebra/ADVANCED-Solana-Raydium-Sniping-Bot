import winston from 'winston';
import pino from 'pino';

const transport = pino.transport({
  targets: [
    {
      level: 'trace',
      target: 'pino-pretty',
      options: {
        colorize: true,
        customColors: 'warn:red,info:blue,error:red',
      },
    },
  ],
});

export const logger = pino(
  {
    level: 'trace',
    redact: ['poolKeys'],
    serializers: {
      error: pino.stdSerializers.err,
    },
    base: undefined,
  },
  transport,
);

export const setUpLogger = () => {
  return winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.colorize(),
          winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
        ),
      }),
      new winston.transports.File({
        filename: 'combined.log',
        level: 'info',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
        ),
      }),
      new winston.transports.File({
        filename: 'errors.log',
        level: 'error',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
        ),
      }),
    ],
  });
};
