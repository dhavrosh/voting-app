import { Server } from 'http';
import express from 'express';
import compression from 'compression';
import * as bodyParser from 'body-parser';

import { connect } from './db';
import { router } from './api';
import { HOST, PORT, DB_URI } from './secrets';

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use((req: express.Request, _: express.Response, next: any) => {
  console.log('path', req.path);
  next();
});
app.use(router);

const server = new Server(app);

connect(DB_URI, () => 
  server.listen(PORT, HOST, () => console.log(`Server started on port ${PORT}`))
);

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});