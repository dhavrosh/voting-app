import * as Hapi from 'hapi';

import VoteController from './controller';
import { Route } from '../types';
import { logger, RedisNativeClient } from '../service';

export default class VoteRoutes implements Route {
  public async register(server: Hapi.Server, redis: RedisNativeClient) {
    return new Promise<void>((resolve) => {
      logger.info('Start adding vote routes');

      const controller = new VoteController(redis);

      server.bind(controller);

      server.route({
        method: 'GET',
        path: '/',
        options: { handler: controller.getCandidates },
      });

      server.route(
        {
          method: 'POST',
          path: '/vote',
          options: { handler: controller.vote },
        },
      );

      logger.info('Finish adding vote routes');

      resolve();
    });
  }
}
