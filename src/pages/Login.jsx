import { useState } from 'react'
import Input from '../components/Input'
import Password from '../components/Password'
import Checkbox from '../components/Checkbox'
import Button from '../components/Button'

function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [accepted, setAccepted] = useState(false)

    return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto min-h-screen justify-center">
      <h1 className="text-3xl font-bold text-lumina-accent mb-4">Create an account</h1>
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Password label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Checkbox label="I accept the terms" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
      <Button onClick={() => alert('submit')}>Create account</Button>

      <p className="text-center text-gray-400 text-sm">Or register with</p>

      <Button variant="secondary" onClick={() => alert('Google')}>Continue with Google</Button>
      <Button variant="secondary" onClick={() => alert('Apple')}>Continue with Apple</Button>
    </div>
  )

}

export default Login