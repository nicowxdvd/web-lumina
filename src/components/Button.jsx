function Button({children, onClick, variant = 'primary'}){
    const styles = {
        primary: 'bg-lumina-accent hover:opacity-90 text-white',
        secondary: 'bg-transparent border border-gray-700 hover:bg-lumina-surface text-white',
    }

    return(
        <button
            onClick={onClick}
            className={`${styles[variant]} font-medium rounded-lg px-6 py-3`}
        >
            {children}
        </button>
    )

}

export default Button