import { Server } from 'http';
import express from 'express';
import compression from 'compression';
import * as bodyParser from 'body-parser';
import * as exphbs from 'express-handlebars';

import { connect } from './db';
import { router } from './api';
import { HOST, PORT, DB_URI } from './secrets';
import * as ampqClient from './ampqClient';

const app = express();
const hbs = exphbs.create({
  extname: '.html',
  defaultLayout: 'layout',
  partialsDir: '../../common/view',
  layoutsDir: '../../common/view',
});

app.engine('html', hbs.engine);
app.set('views', __dirname + '/public');
app.set('view engine', 'html');

app.use((req: any, _: any, next: any) => {
  console.log('PATH', req.path);
  next();
})
app.use(compression());
app.use(bodyParser.json());
app.use(router);

const server = new Server(app);

connect(DB_URI, async () => {

  await ampqClient.init();

  server.listen(PORT, HOST, () => console.log(`Server started on port ${PORT}`))
});

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});