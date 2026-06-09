import winston from 'winston';
import { config } from '../../config/index.js';

const { combine, timestamp, printf, colorize, json } = winston.format;

const devFormat = combine(
  colorize(),
  timestamp({ format: 'HH:mm:ss' }),
  printf(({ level, message, timestamp, ...meta }) => {
    const metaStr = Object.keys(meta).length ? `\n${JSON.stringify(meta, null, 2)}` : '';
    return `${timestamp} [${level}] ${message}${metaStr}`;
  })
);

const prodFormat = combine(timestamp(), json());

export const logger = winston.createLogger({
  level: config.server.isDev ? 'debug' : 'info',
  format: config.server.isDev ? devFormat : prodFormat,
  transports: [new winston.transports.Console()],
});
