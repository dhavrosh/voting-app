import request from 'request-promise';

const adjustPath = (path: string) => path[0] !== '/' ? '/' + path : path;

export interface Requester {
  call(path: string, options?: request.Options): Promise<any>;
}

export const createRequester = (host: string): Requester => ({
  call: async (path, options?) => request({
    ...options, uri: `${host}${adjustPath(path)}`
  })
})