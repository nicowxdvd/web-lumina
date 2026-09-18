import type { Credentials } from './credentials'

export interface ValidationErrors {
  email?: string
  password?: string
}

export function validateCredentials({ email, password }: Credentials): ValidationErrors {
  const errors: ValidationErrors = {}

  if (!email) {
    errors.email = 'El email es obligatorio'
  } else if (email.length < 2 || email.length > 50) {
    errors.email = 'El email debe tener entre 2 y 50 caracteres'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'El correo electrónico no es válido'
  }

  if (!password) {
    errors.password = 'La contraseña es obligatoria'
  } else if (password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres'
  }

  return errors
}
