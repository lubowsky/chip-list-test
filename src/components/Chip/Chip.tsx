import React from 'react'
import './styles.css'

export interface ChipProps {
  label: string
  selected?: boolean
  onClick?: () => void
}

export const Chip: React.FC<ChipProps> = ({ label, selected, onClick }) => {
  return (
    <button
      className={`chip ${selected ? "chip--selected" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
