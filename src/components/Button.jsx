function Button({children, onClick}){
    return(
        <button
            onClick={onClick}
            className='bg-lumina-accent hover:opacity-90 text-white font-medium rounded-lg px-6 py-3'>
            {children}
        </button>
    )

}

export default Button