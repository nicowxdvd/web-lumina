import AuthLayout from '@/features/auth/presentation/AuthLayout'
import { LoginView } from '@/features/auth/presentation/views/LoginView'

export default function HomePage() {
  return (
    <AuthLayout>
      <LoginView />
    </AuthLayout>
  )
}
