import * as Hapi from 'hapi';

import VoteController from './controller';
import { Route } from '../types';
import { logger, AmqpClient } from '../service';

export default class VoteRoutes implements Route {
  public async register(server: Hapi.Server, amqpClient: AmqpClient) {
    return new Promise<void>((resolve) => {
      logger.info('Start adding vote routes');

      const controller = new VoteController(amqpClient);

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
