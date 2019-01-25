import { Server } from 'http';
import * as path from 'path'
import express from 'express';
import compression from 'compression';
import * as bodyParser from 'body-parser';
import * as exphbs from 'express-handlebars';
import socketIo from 'socket.io';

import Controller from './controller';
import { HOST, PORT, DB_URI, RABBITMQ_URI, EXCHANGE_NAME } from './secrets';
import { AmqpClient, MysqlPool } from '../../common/service';

const init = async () => {

  const app = express();

  const server = new Server(app);
  const io = socketIo(server);

  io.sockets.on(
    'connection',
    socket => socket.on('subscribe', data => socket.join(data.channel))
  );

  const pool = new MysqlPool({ uri: DB_URI });
  const amqpClient = await new AmqpClient(RABBITMQ_URI, EXCHANGE_NAME).init();
  const ctrl = new Controller(io, pool, amqpClient);

  const hbs = exphbs.create({
    extname: '.html',
    defaultLayout: 'layout',
    partialsDir: '../../common/view',
    layoutsDir: '../../common/view',
  });

  app.engine('html', hbs.engine);
  app.set('views', __dirname + '/public');
  app.set('view engine', 'html');

  app.use(compression());
  app.use(bodyParser.json());
  app.use('/public', express.static(path.join(__dirname, 'public')))
  app.use('/', ctrl.renderResults.bind(ctrl));

  server.listen(PORT, HOST, () => console.log(`Server started on port ${PORT}`));
}

init();

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});