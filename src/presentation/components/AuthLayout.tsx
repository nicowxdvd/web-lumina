import type { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-lumina-outer p-4 sm:p-8 lg:p-12">
      <div className="w-full max-w-6xl lg:min-h-[640px] flex rounded-3xl overflow-hidden bg-lumina-bg shadow-2xl">
        <div
          className="hidden lg:block w-1/2 bg-cover bg-center"
          style={{ backgroundImage: 'url(/auth-background.jpg)' }}
        />
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
          {children}
        </div>
      </div>
    </div>
  )
}
