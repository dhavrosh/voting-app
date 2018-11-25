import * as Hapi from 'hapi';

export interface Route {
  register(server: Hapi.Server): Promise<void>;
}
