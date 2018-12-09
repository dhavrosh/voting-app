import * as Restify from 'restify';

const respond = (req: Restify.Request, res: Restify.Response, next: Restify.Next) => {
  res.send('hello ' + req.params.name);
  next();
}

const server = Restify.createServer();

server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`${server.name} listening at ${server.url}`);
});