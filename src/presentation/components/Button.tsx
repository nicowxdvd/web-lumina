import type { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps {
  children: ReactNode
  onClick: () => void
  variant?: ButtonVariant
  disabled?: boolean
}

const styles: Record<ButtonVariant, string> = {
  primary: 'bg-lumina-accent hover:opacity-90 text-white',
  secondary: 'bg-transparent border border-gray-700 hover:bg-lumina-surface text-white',
}

export default function Button({ children, onClick, variant = 'primary', disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles[variant]} font-medium rounded-lg px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  )
}
