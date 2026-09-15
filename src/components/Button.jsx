funcion Button({children, onClick}){
    return(
        <Button
            onClick={onClick}
            className='"bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg px-6 py-3'>
            {children}
        </Button>
    )

}

export default Button