import background from '../assets/auth-background.jpg'

function AuthLayout({ children }) {
    return (
        <div className="min-h-screen flex bg-lumina-bg">
            <div
                className="hidden lg:block w-1/2 bg-cover bg-center"
                style={{ backgroundImage: `url(${background})` }}
            />
            <div className="w-full lg:w-1/2 flex items-center justify-center">
                {children}
            </div>
        </div>
    )
}

export default AuthLayout