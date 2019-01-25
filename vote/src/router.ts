import * as Hapi from 'hapi';

import { logger, AmqpClient } from './service';
import VoteRouter from './api/routes';

export default class Router {
  public static async loadRoutes(server: Hapi.Server, amqpClient: AmqpClient): Promise<void> {
    logger.info('Start adding routes');

    await new VoteRouter().register(server, amqpClient);

    logger.info('Finish adding routes');
  }
}
