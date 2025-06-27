export type CacheOption =
  | 'default'
  | 'no-store'
  | 'force-cache'
  | {
      revalidate?: number
      tags?: string[]
    }

export type HttpRequest<TBody> = {
  url: string
  method: 'get' | 'post' | 'put' | 'delete'
  body?: TBody
  headers?: Record<string, string>
  params?: Record<string, any>
  cache?: CacheOption
}

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  conflict = 409,
  preconditionFailed = 412,
  serverError = 500,
}

export type HttpResponse<TResponse> = {
  statusCode: HttpStatusCode
  body?: TResponse
}

export interface HttpClient {
  request<TResponse, TBody>(data: HttpRequest<TBody>): Promise<HttpResponse<TResponse>>
}

export interface HttpClientAdapter extends HttpClient {
  get<TResponse>(
    url: string,
    params?: Record<string, any>,
    cache?: CacheOption
  ): Promise<HttpResponse<TResponse>>
  post<TResponse, TBody>(
    url: string,
    body?: TBody,
    params?: Record<string, any>,
    cache?: CacheOption
  ): Promise<HttpResponse<TResponse>>
  put<TResponse, TBody>(
    url: string,
    body?: TBody,
    params?: Record<string, any>,
    cache?: CacheOption
  ): Promise<HttpResponse<TResponse>>
  delete<TResponse>(
    url: string,
    params?: Record<string, any>,
    cache?: CacheOption
  ): Promise<HttpResponse<TResponse>>
}
