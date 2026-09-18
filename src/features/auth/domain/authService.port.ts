import type { Credentials } from './credentials'

export interface LoginResult {
  success: boolean
  message?: string
}

export interface AuthService {
  login(credentials: Credentials): Promise<LoginResult>
}
