import type { Credentials } from '@/domain/auth/credentials'
import type { ValidationErrors } from '@/domain/auth/validateCredentials'
import { validateCredentials } from '@/domain/auth/validateCredentials'
import type { AuthService } from '@/domain/auth/authService.port'

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
