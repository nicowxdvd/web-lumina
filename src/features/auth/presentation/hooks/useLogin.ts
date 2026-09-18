'use client'

import { useState } from 'react'
import type { ValidationErrors } from '@/features/auth/domain/validateCredentials'
import { createLoginUseCase } from '@/features/auth/application/loginUseCase'
import { apiAuthService } from '@/features/auth/infrastructure/apiAuthService'

const login = createLoginUseCase(apiAuthService)

export function useLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [formError, setFormError] = useState<string | undefined>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit() {
    setIsSubmitting(true)
    setFormError(undefined)
    const result = await login({ email, password })
    setErrors(result.errors)
    setIsSubmitting(false)

    if (!result.success) {
      setFormError(result.message)
    }
  }

  return { email, setEmail, password, setPassword, errors, formError, isSubmitting, handleSubmit }
}
