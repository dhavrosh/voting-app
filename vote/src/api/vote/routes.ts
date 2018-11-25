import * as Hapi from 'hapi';

import VoteController from './controller';

import { Route } from '../../types';
import { logger } from '../../service';

export default class UserRoutes implements Route {
  public async register(server: Hapi.Server): Promise<any> {
    return new Promise((resolve) => {
      logger.info('Start adding vote routes');

      const controller = new VoteController();

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
