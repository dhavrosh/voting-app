import * as Hapi from 'hapi';

import { logger } from './service';
import VoteRouter from './api/routes';

export default class Router {
  public static async loadRoutes(server: Hapi.Server): Promise<void> {
    logger.info('Start adding routes');

    await new VoteRouter().register(server);

    logger.info('Finish adding routes');
  }
}
