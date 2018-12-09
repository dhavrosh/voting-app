import * as Redis from 'redis';
import { promisifyAll } from 'bluebird';

declare module 'redis' {

  export interface RedisClient extends NodeJS.EventEmitter {
    rpushAsync(list: string, value: string): Promise<void>;
    lrangeAsync(key: string, start: number, stop: number): Promise<string[]>;
    blpopAsync(list: string, timeout: number): Promise<string[]>;
  }
}

interface Logger {
  error: (msg: string) => void;
}

export class RedisClient {

  private client: Redis.RedisClient;

  constructor(private logger: Logger) {}

  public async connect(options: Redis.ClientOpts) {
    this.client = promisifyAll(Redis).createClient(options);
    this.client.on('error', this.logger.error);

    return this.client;
  }

}
