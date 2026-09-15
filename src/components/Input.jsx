function Input({ label, type='text', value, onChange}){
    return (
        <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-300">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            className="bg-[#1A1825] border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-purple-600"/>
        </div> 
    )

}

export default Input