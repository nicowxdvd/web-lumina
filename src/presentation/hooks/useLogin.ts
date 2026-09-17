'use client'

import { useState } from 'react'
import type { ValidationErrors } from '@/domain/auth/validateCredentials'
import { createLoginUseCase } from '@/application/auth/loginUseCase'
import { apiAuthService } from '@/infrastructure/auth/apiAuthService'

const login = createLoginUseCase(apiAuthService)

export function useLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit() {
    setIsSubmitting(true)
    const result = await login({ email, password })
    setErrors(result.errors)
    setIsSubmitting(false)

    if (result.success) {
      alert('Enviado')
    }
  }

  return { email, setEmail, password, setPassword, errors, isSubmitting, handleSubmit }
}
