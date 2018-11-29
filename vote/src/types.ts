import * as Hapi from 'hapi';
import { RedisClient } from 'redis';

export interface Route {
  register(server: Hapi.Server, redis: RedisClient): Promise<void>;
}
