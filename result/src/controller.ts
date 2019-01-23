import { Server } from 'socket.io';

import { MysqlPool } from '../../common/service';

const pollTimeout = 2000;

const selectResults = async (mysqlPool: MysqlPool) => 
  mysqlPool.doQuery('SELECT candidate_id, COUNT(id) AS count FROM vote GROUP BY candidate_id');

export const pollResultDb = async (mysqlPool: MysqlPool, io: Server) => {
  const results = await selectResults(mysqlPool);

  io.sockets.emit('results', JSON.stringify(results));
  
  setTimeout(() => pollResultDb(mysqlPool, io), pollTimeout);
}