export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  name: string
  accessToken: string
  refreshToken: string
}
