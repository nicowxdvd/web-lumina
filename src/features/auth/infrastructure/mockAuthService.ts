import type { AuthService, LoginResult } from '@/features/auth/domain/authService.port'
import type { Credentials } from '@/features/auth/domain/credentials'

export const mockAuthService: AuthService = {
  async login(_credentials: Credentials): Promise<LoginResult> {
    return { success: true }
  },
}
