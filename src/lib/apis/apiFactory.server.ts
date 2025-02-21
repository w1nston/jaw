// TODO: perhaps more from fetch...
export type Api = {
  get<T>(path: string): Promise<T>;
  // TODO: post, put, options, etc...
};

type ApiOptions = {
  headers: Headers;
};

function createGet(baseUrl: string, options: ApiOptions) {
  return async function get<T>(path: string): Promise<T> {
    let response = await fetch(`${baseUrl}${path}`, {
      headers: options.headers, // TODO: account for if not passed...
    });
    return response.json();
  };
}

export function createApi(baseUrl: string, options: ApiOptions): Api {
  return {
    get: createGet(baseUrl, options),
  };
}
