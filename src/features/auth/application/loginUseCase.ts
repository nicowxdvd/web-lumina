import type { Credentials } from '@/features/auth/domain/credentials'
import type { ValidationErrors } from '@/features/auth/domain/validateCredentials'
import { validateCredentials } from '@/features/auth/domain/validateCredentials'
import type { AuthService } from '@/features/auth/domain/authService.port'

export interface LoginUseCaseResult {
  errors: ValidationErrors
  success: boolean
  message?: string
}

export function createLoginUseCase(authService: AuthService) {
  return async function login(credentials: Credentials): Promise<LoginUseCaseResult> {
    const errors = validateCredentials(credentials)

    if (Object.keys(errors).length > 0) {
      return { errors, success: false }
    }

    const result = await authService.login(credentials)
    return { errors: {}, success: result.success, message: result.message }
  }
}
