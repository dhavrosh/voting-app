import * as Restify from 'restify';

import { HOST, PORT } from './secrets';
import * as ampqClient from './ampqClient';

const start = async () => {
  
  const server = Restify.createServer();

  await ampqClient.init();

  server.listen(PORT, HOST, async () => {
    console.log(`${server.name} listening at ${server.url}`);
  });
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

start();