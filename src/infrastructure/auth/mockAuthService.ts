import type { AuthService, LoginResult } from '@/domain/auth/authService.port'
import type { Credentials } from '@/domain/auth/credentials'

export const mockAuthService: AuthService = {
  async login(_credentials: Credentials): Promise<LoginResult> {
    return { success: true }
  },
}
