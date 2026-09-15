function Button({children, onClick}){
    return(
        <button
            onClick={onClick}
            className='bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg px-6 py-3'>
            {children}
        </button>
    )

}

export default Button