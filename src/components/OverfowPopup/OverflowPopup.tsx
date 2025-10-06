import React from "react"
import { Chip } from "../Chip/Chip"
import './styles.css'


interface OverflowPopupProps {
  hiddenItems: string[]
  selectedItems: string[]
  onSelect?: (item: string) => void
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const OverflowPopup: React.FC<OverflowPopupProps> = ({
  hiddenItems,
  selectedItems,
  onSelect,
  open,
  onOpenChange,
}) => {
  return (
    <div className="overflow-popup">
      <button
        className="overflow-btn"
        onClick={() => onOpenChange(!open)}
      >
        {'...'}
      </button>
      {open && (
        <div className="overflow-content">
          {hiddenItems.map(item => (
            <Chip
              key={item}
              label={item}
              selected={selectedItems.includes(item)}
              onClick={() => onSelect?.(item)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
