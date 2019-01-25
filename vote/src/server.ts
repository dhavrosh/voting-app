import * as Hapi from 'hapi';
import * as vision from 'vision';

import { HOST, PORT } from './secrets';
import { logger, ampqClient } from './service';
import Router from './router';

export default class Server {
  private static instance: Hapi.Server;

  private static async initTemplateEngine(server: Hapi.Server) {
    await server.register(vision);

    server.views({
      engines: { html: require('handlebars') },
      relativeTo: __dirname,
      layout: true,
      path: 'template',
      partialsPath: '../../common/view',
      layoutPath: '../../common/view',
    });
  }

  public static async start(): Promise<Hapi.Server> {
    try {

      Server.instance = new Hapi.Server({ host: HOST, port: PORT });

      await ampqClient.init();

      await Server.initTemplateEngine(Server.instance);
      await Router.loadRoutes(Server.instance, ampqClient);
      await Server.instance.start();

      logger.info(`Server started successfully on port ${Server.instance.info.port}`);

      return Server.instance;
    } catch (error) {
      logger.info(`There was something wrong: ${error}`);

      throw error;
    }
  }

  public static stop(): Promise<Error | void> {
    logger.info('Stop the server');

    return Server.instance.stop();
  }

  public static async recycle(): Promise<Hapi.Server> {
    await Server.stop();

    return await Server.start();
  }

  public static getInstance(): Hapi.Server {
    return Server.instance;
  }

}
