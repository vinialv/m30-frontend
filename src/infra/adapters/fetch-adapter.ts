import { cookies } from 'next/headers'
import { HttpClientAdapter, HttpRequest, HttpResponse, CacheOption } from '../http'

export class FetchHttpClientAdapter implements HttpClientAdapter {
  private readonly baseURL: string

  constructor() {
    this.baseURL = process.env.API_URL || ''
  }

  private async getTokenFromCookie(): Promise<string | null> {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    return token?.value || null
  }

  async request<TResponse = any, TBody = any>(
    data: HttpRequest<TBody>
  ): Promise<HttpResponse<TResponse>> {
    try {
      const token = await this.getTokenFromCookie()

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(data.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      }

      const url = new URL(`${this.baseURL}${data.url}`)
      if (data.params) {
        Object.entries(data.params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            url.searchParams.append(key, String(value))
          }
        })
      }

      const isGetRequest = data.method.toLowerCase() === 'get'
      const cacheOption = typeof data.cache === 'object' ? data.cache : undefined

      const fetchOptions: RequestInit & { next?: { revalidate?: number; tags?: string[] } } = {
        method: data.method.toUpperCase(),
        headers,
        body: data.body ? JSON.stringify(data.body) : undefined,
        ...(isGetRequest
          ? {
              next: {
                revalidate: cacheOption?.revalidate ?? 900,
                tags: cacheOption?.tags ?? [],
              },
            }
          : {}),
        ...(data.cache === 'force-cache' ? { cache: 'force-cache' } : {}),
      }

      const res = await fetch(url.toString(), fetchOptions)
      const responseData = await res.json().catch(() => ({}))

      return {
        statusCode: res.status,
        body: responseData,
      }
    } catch (error: any) {
      const message =
        error instanceof Error ? error.message : 'Erro inesperado ao conectar com o servidor.'

      return {
        statusCode: 500,
        body: { message } as unknown as TResponse,
      }
    }
  }

  async get<TResponse = any>(
    url: string,
    params?: Record<string, any>,
    cache?: CacheOption
  ): Promise<HttpResponse<TResponse>> {
    return this.request<TResponse>({ url, method: 'get', params, cache })
  }

  async post<TResponse = any, TBody = any>(
    url: string,
    body?: TBody,
    params?: Record<string, any>,
    cache?: CacheOption
  ): Promise<HttpResponse<TResponse>> {
    return this.request<TResponse, TBody>({ url, method: 'post', body, params, cache })
  }

  async put<TResponse = any, TBody = any>(
    url: string,
    body?: TBody,
    params?: Record<string, any>,
    cache?: CacheOption
  ): Promise<HttpResponse<TResponse>> {
    return this.request<TResponse, TBody>({ url, method: 'put', body, params, cache })
  }

  async delete<TResponse = any>(
    url: string,
    params?: Record<string, any>,
    cache?: CacheOption
  ): Promise<HttpResponse<TResponse>> {
    return this.request<TResponse>({ url, method: 'delete', params, cache })
  }
}
