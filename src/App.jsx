import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './components/AuthLayout'
import Login from './pages/Login'
import Terminos from './pages/Terminos'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout><Login /></AuthLayout>} />
        <Route path="/terminos" element={<Terminos />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

