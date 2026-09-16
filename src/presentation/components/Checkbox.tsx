import type { ChangeEvent, ReactNode } from 'react'

interface CheckboxProps {
  label: ReactNode
  checked: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function Checkbox({ label, checked, onChange }: CheckboxProps) {
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
