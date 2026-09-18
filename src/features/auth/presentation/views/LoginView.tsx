'use client'

import { useState } from 'react'
import Link from 'next/link'
import Input from '@/shared/ui/Input'
import Password from '@/shared/ui/Password'
import Checkbox from '@/shared/ui/Checkbox'
import Button from '@/shared/ui/Button'
import { useLogin } from '@/features/auth/presentation/hooks/useLogin'

export function LoginView() {
  const { email, setEmail, password, setPassword, errors, isSubmitting, handleSubmit, formError } = useLogin()
  const [accepted, setAccepted] = useState(false)

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
      <h1 className="text-3xl font-bold text-lumina-accent mb-4">¡Bienvenido!</h1>
      <Input
        label="Correo electrónico"
        type="email"
        value={email}
        error={errors.email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Password
        label="Contraseña"
        value={password}
        error={errors.password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Checkbox
        label={
          <>
            Acepto los{' '}
            <Link href="/terminos" className="underline hover:text-lumina-accent">
              términos y condiciones
            </Link>
          </>
        }
        checked={accepted}
        onChange={(e) => setAccepted(e.target.checked)}
      />
      {formError && <p className="text-red-500 text-sm text-center">{formError}</p>}
      <Button onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'Ingresando…' : 'Ingresar'}
      </Button>

      <p className="text-center text-gray-400 text-sm">O continuá con</p>

      <Button variant="secondary" onClick={() => alert('Continuar con Google')}>
        Continuar con Google
      </Button>
      <Button variant="secondary" onClick={() => alert('Continuar con Apple')}>
        Continuar con Apple
      </Button>
    </div>
  )
}
