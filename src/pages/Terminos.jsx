import { Link } from 'react-router-dom'

function Terminos() {
  return (
    <div className="min-h-screen bg-lumina-bg text-white px-6 py-12">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        <Link to="/" className="text-lumina-accent text-sm hover:underline w-fit">
          ← Volver
        </Link>

        <h1 className="text-3xl font-bold text-lumina-accent">Términos y condiciones</h1>

        <p className="text-gray-300 text-sm">
          Al crear una cuenta o iniciar sesión en AMU, aceptás los siguientes términos.
        </p>

        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">1. Uso de la cuenta</h2>
          <p className="text-gray-400 text-sm">
            Sos responsable de mantener la confidencialidad de tu contraseña y de toda actividad
            realizada desde tu cuenta.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">2. Datos personales</h2>
          <p className="text-gray-400 text-sm">
            Los datos que ingreses (nombre, email) se usan únicamente para el funcionamiento de la
            aplicación, no se comparten con terceros.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">3. Cambios en los términos</h2>
          <p className="text-gray-400 text-sm">
            Estos términos pueden actualizarse. Te vamos a avisar si hay cambios importantes.
          </p>
        </section>
      </div>
    </div>
  )
}

export default Terminos
