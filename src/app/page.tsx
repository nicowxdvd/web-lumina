import AuthLayout from '@/presentation/components/AuthLayout'
import { LoginView } from '@/presentation/views/LoginView'

export default function HomePage() {
  return (
    <AuthLayout>
      <LoginView />
    </AuthLayout>
  )
}
