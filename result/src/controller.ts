import { Request, Response } from 'express';
import { Server } from 'socket.io';

import { CANDIDATE_URI } from './secrets';
import { MysqlPool, createRequester } from '../../common/service';

const pollTimeout = 2000;
const requester = createRequester(CANDIDATE_URI);

export const renderResults = async (_: Request, res: Response) => {
  const data = await requester.call('/api');

  res.render(
    'index',
    {
      data: JSON.parse(data),
      rawData: encodeURIComponent(JSON.stringify(data))
    }
  );
}

const selectResults = async (mysqlPool: MysqlPool) =>
  mysqlPool.doQuery('SELECT candidate_id, COUNT(id) AS count FROM vote GROUP BY candidate_id');

export const pollResultDb = async (mysqlPool: MysqlPool, io: Server) => {
  const results = await selectResults(mysqlPool);

  io.sockets.emit('results', JSON.stringify(results));

  setTimeout(() => pollResultDb(mysqlPool, io), pollTimeout);
}