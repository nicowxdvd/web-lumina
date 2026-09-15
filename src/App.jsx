
import Button from './components/Button'

function App() {
  return(
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold text-purple-600">Lumina</h1>
      <Button onClick={()=> alert('Click')}>Create Account</Button>
    </div>
  )
}



export default App
