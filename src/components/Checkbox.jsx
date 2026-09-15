function Checkbox({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-300">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 accent-lumina-accent"
      />
      {label}
    </label>
  )
}

export default Checkbox