import * as Hapi from 'hapi';
import { RedisClient } from 'redis';

import VoteController from './controller';
import { Route } from '../types';
import { logger } from '../service';

export default class VoteRoutes implements Route {
  public async register(server: Hapi.Server, redis: RedisClient) {
    return new Promise<void>((resolve) => {
      logger.info('Start adding vote routes');

      const controller = new VoteController(redis);

      server.route({
        method: 'GET',
        path: '/',
        handler: { view: 'index' },
      });

      server.route([
        {
          method: 'GET',
          path: '/api/vote',
          handler: controller.get,
        },
      ]);

      logger.info('Finish adding vote routes');

      resolve();
    });
  }
}
