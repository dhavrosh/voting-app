import * as Restify from 'restify';

import { pollVoteList } from './controller';
import { DB_URI, RHOST, HOST, PORT } from './secrets';

import { MysqlPool } from '../../common/mysql';
import { RedisClient } from '../../common/redis';

const start = async () => {
  
  const server = Restify.createServer();

  const mysqlPool = new MysqlPool({ uri: DB_URI });
  const redis = new RedisClient(console);
  const redisClient = await redis.connect({ host: RHOST });

  server.listen(PORT, HOST, async () => {
    console.log(`${server.name} listening at ${server.url}`);

    pollVoteList(redisClient);

    const res = await mysqlPool.doQuery('SELECT * FROM vote');

    console.log('res', res);
  });
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

start();