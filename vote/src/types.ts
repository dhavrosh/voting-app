import { Request, Server } from 'hapi';
import { AmqpClient } from './service';

export interface Route {
  register(server: Server, amqpClient: AmqpClient): Promise<void>;
}

export interface PostRequest<T extends object> extends Request {
  payload: T;
}
