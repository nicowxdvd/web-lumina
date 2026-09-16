function Input({ label, type='text', value, onChange, error}){
    return (
        <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-300">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            className={`bg-[#1A1825] border ${error ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-2 text-white outline-none focus:border-purple-600`}/>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div> 
    )

}

export default Input