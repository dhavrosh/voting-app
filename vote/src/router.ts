import * as Hapi from 'hapi';

import { logger, RedisNativeClient } from './service';
import VoteRouter from './api/routes';

export default class Router {
  public static async loadRoutes(server: Hapi.Server, redis: RedisNativeClient): Promise<void> {
    logger.info('Start adding routes');

    await new VoteRouter().register(server, redis);

    logger.info('Finish adding routes');
  }
}
