
import { useState } from 'react'
import Button from './components/Button'
import Input from './components/Input'
import Password from './components/Password'
import Checkbox from './components/Checkbox'


function App() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [accepted, setAccepted] = useState(false)

  return(
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold text-purple-600">Lumina</h1>
      <Input label="Name" value={name} onChange={(e)=> setName(e.target.value)} />
      <Password label="Password" value={password} onChange={(e)=> setPassword(e.target.value)} />
      <Checkbox label="I accept the terms" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
      <Button onClick={()=> alert('Click')}>Create Account</Button>
    </div>
  )
}



export default App
