import * as Redis from 'redis';
import { promisifyAll } from 'bluebird';
import { LoggerInstance } from 'winston';

declare module 'redis' {

  export interface RedisClient extends NodeJS.EventEmitter {
    rpushAsync(list: string, value: string): Promise<void>;
    lrangeAsync(key: string, start: number, stop: number): Promise<string[]>;
  }
}

export class RedisClient {

  private client: Redis.RedisClient;

  constructor(private logger: LoggerInstance) {
    this.logger = logger;
  }

  public async connect(url: string) {
    this.client = promisifyAll(Redis).createClient(url);
    this.client.on('error', this.logger.error);

    return this.client;
  }

}
