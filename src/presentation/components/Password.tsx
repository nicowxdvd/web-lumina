'use client'

import { useState } from 'react'
import type { ChangeEvent } from 'react'

interface PasswordProps {
  label: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  error?: string
}

export default function Password({ label, value, onChange, error }: PasswordProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          className={`bg-[#1A1825] border ${error ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-2 pr-16 text-white outline-none focus:border-purple-600 w-full`}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400"
        >
          {showPassword ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>
    </div>
  )
}
