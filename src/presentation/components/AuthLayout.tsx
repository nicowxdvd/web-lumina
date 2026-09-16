import type { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex bg-lumina-bg">
      <div
        className="hidden lg:block w-1/2 bg-cover bg-center"
        style={{ backgroundImage: 'url(/auth-background.jpg)' }}
      />
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        {children}
      </div>
    </div>
  )
}
