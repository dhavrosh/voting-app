import { Logger, transports as Transports, LoggerInstance } from 'winston';
import 'winston-daily-rotate-file';

import { LOG_LEVEL } from '../secrets';

export class ApiLogger {
  public static newInstance(): LoggerInstance {
    const rotateFileTransport = new Transports.DailyRotateFile({
      level: LOG_LEVEL,
      datePattern: 'dd-MM-yyyy',
      dirname: './logs',
      filename: './log',
      prepend: true,
    });

    const consoleTransport = new Transports.Console({
      colorize: true,
      prettyPrint: true,
      level: 'info',
    });

    return new Logger({
      transports: [rotateFileTransport, consoleTransport],
    });
  }
}
