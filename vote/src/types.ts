import { Request, Server } from 'hapi';
import { RedisClient } from 'redis';

export interface Route {
  register(server: Server, redis: RedisClient): Promise<void>;
}

export interface PostRequest<T extends object> extends Request {
  payload: T;
}
