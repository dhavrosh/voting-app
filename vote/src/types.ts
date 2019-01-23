import { Request, Server } from 'hapi';
import { RedisNativeClient } from './service';

export interface Route {
  register(server: Server, redis: RedisNativeClient): Promise<void>;
}

export interface PostRequest<T extends object> extends Request {
  payload: T;
}
