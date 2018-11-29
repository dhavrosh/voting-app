import * as Hapi from 'hapi';
import * as DotEnv from 'dotenv';

import Router from './router';
import { logger, redis } from './service';

export default class Server {
  private static instance: Hapi.Server;

  public static async start(): Promise<Hapi.Server> {
    try {
      DotEnv.config({ path: `${process.cwd()}/.env` });

      Server.instance = new Hapi.Server({
        host: process.env.HOST,
        port: process.env.PORT,
      });

      const redisClient = await redis.connect('redis://redis');

      await Router.loadRoutes(Server.instance, redisClient);
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
