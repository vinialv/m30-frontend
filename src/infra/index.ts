import { FetchHttpClientAdapter } from './adapters/fetch-adapter'

export * from './adapters/fetch-adapter'
export * from './http'

export const api = new FetchHttpClientAdapter()
