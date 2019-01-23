import { Server } from 'http';
import * as path from 'path'
import * as express from 'express';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as exphbs from 'express-handlebars';
import * as socketIo from 'socket.io';

import { pollResultDb } from './controller';
import { HOST, PORT, DB_URI } from './secrets';
import { MysqlPool } from '../../common/service';

const app = express();
const hbs = exphbs.create({
  extname: '.html',
  defaultLayout: 'layout',
  layoutsDir: '../../common/view',
});

app.engine('html', hbs.engine);
app.set('views', __dirname + '/public');
app.set('view engine', 'html');

app.use(compression());
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/', (_: express.Request, res: express.Response) => res.render('index'));

const server = new Server(app);
const io = socketIo(server);

io.sockets.on(
  'connection', 
  socket => socket.on('subscribe', data => socket.join(data.channel))
);

server.listen(PORT, HOST, () => {
  console.log(`Server started on port ${PORT}`);

  const mysqlPool = new MysqlPool({ uri: DB_URI });

  pollResultDb(mysqlPool, io);
});