import * as mysql from "mysql2/promise";
import { Pool as BasePool, PoolOptions, QueryOptions } from "mysql2/promise";

interface OwnPoolOptions extends PoolOptions {
  uri?: string;
}

declare module "mysql2/promise" {

  interface Pool {
    escape(value: any): string;
  }

  function createPool(config: OwnPoolOptions): Pool;
}

export class MysqlPool {

  private pool: BasePool;

  constructor(config: OwnPoolOptions) {
    this.pool = mysql.createPool(config);
  }

  public async doQuery(...args: Array<any>) {
    const [rows] = await this.pool.query.apply(this.pool, args as [QueryOptions, any]);
    return rows;
  }

  public async end() {
    return this.pool.end();
  }

  public async getConnection() {
    return this.pool.getConnection();
  }

  public escape(value: any) {
    return this.pool.escape(value);
  }
}