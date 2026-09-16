import { useState } from 'react'
import Input from '../components/Input'
import Password from '../components/Password'
import Checkbox from '../components/Checkbox'
import Button from '../components/Button'


function validate({email, password}){
  const errors = {}
  if(!email){
    errors.email = 'El email es obligatorio';

  } else if(email.length < 2 || email.length > 50){
    errors.email = 'El email debe tener entre 2 y 50 caracteres'

  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'El correo electrónico no es válido'

  }

  if(!password){
    errors.password = 'La constraseña es obligatoria';

  }else if(password.length < 6){
    errors.password = 'La contraseña debe tener al menos 6 caracteres'

  }

  return errors
}


function Login(){
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [accepted, setAccepted] = useState(false);
    const [errors, setErrors]     = useState({});

    function handleSubmit(){
      const  validationErrors = validate({email, password});
      setErrors(validationErrors);

      if(Object.keys(validationErrors).length === 0){
        alert('Submit')
      }

    }

    return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto min-h-screen justify-center">
      <h1 className="text-3xl font-bold text-lumina-accent mb-4">Bienvenido!</h1>
      <Input label="Email" type="email" value={email} error={errors.email} onChange={(e) => setEmail(e.target.value)} />
      <Password label="Password" value={password} error={errors.password} onChange={(e) => setPassword(e.target.value)} />
      <Checkbox label="I accept the terms" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
      <Button onClick={handleSubmit}>Ingresar</Button>

      <p className="text-center text-gray-400 text-sm">Or register with</p>

      <Button variant="secondary" onClick={() => alert('Google')}>Continue with Google</Button>
      <Button variant="secondary" onClick={() => alert('Apple')}>Continue with Apple</Button>
    </div>
  )

}

export default Login