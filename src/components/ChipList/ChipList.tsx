import React, { useRef, useState, useEffect } from 'react'
import { Chip } from '../Chip/Chip'
import { OverflowPopup } from '../OverfowPopup/OverflowPopup'
import './styles.css'

interface ChipListProps {
  items: string[]
  selectedItems?: string[]
  defaultSelected?: string[]
  onChange?: (selected: string[]) => void
}

export const ChipList: React.FC<ChipListProps> = ({ items, selectedItems, defaultSelected = [], onChange }) => {
  const [visibleCount, setVisibleCount] = useState(items.length)
  const [popupOpen, setPopupOpen] = useState(false)
  const [internalSelected, setInternalSelected] = useState<string[]>(defaultSelected)

  const containerRef = useRef<HTMLDivElement>(null)
  const chipWidths = useRef<number[]>([])
  const overflowWidth = useRef<number>(0)

  const currentSelected = selectedItems !== undefined ? selectedItems : internalSelected

  useEffect(() => {
    const hiddenMeasure = document.createElement('div')
    hiddenMeasure.style.cssText = `
      position: absolute;
      visibility: hidden;
      height: 0;
      overflow: hidden;
      white-space: nowrap;
    `
    document.body.appendChild(hiddenMeasure)

    hiddenMeasure.innerHTML = items
      .map(item => `<button class="chip">${item}</button>`)
      .join('') + `<button class="overflow-btn">...</button>`

    const children = Array.from(hiddenMeasure.children) as HTMLElement[]
    chipWidths.current = children.slice(0, items.length).map(el => el.offsetWidth)
    overflowWidth.current = children[items.length].offsetWidth

    hiddenMeasure.remove()
  }, [items])

  useEffect(() => {
    if (!containerRef.current) return

    const observer = new ResizeObserver(() => {
      if (!containerRef.current) return
      const containerWidth = containerRef.current.offsetWidth

      let total = 0
      let count = items.length
      for (let i = 0; i < chipWidths.current.length; i++) {
        total += chipWidths.current[i] + 4
        if (total + overflowWidth.current > containerWidth) {
          count = i
          break
        }
      }
      setVisibleCount(count)
    })

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [items])

  const visible = items.slice(0, visibleCount)
  const hidden = items.slice(visibleCount)

  const toggleSelect = (item: string) => {
    let updated: string[]
    if (currentSelected.includes(item)) {
      updated = currentSelected.filter(i => i !== item)
    } else {
      updated = [ ...currentSelected, item ]
    }

    if (selectedItems !==undefined) {
      onChange?.(updated)
    } else {
      setInternalSelected(updated)
      onChange?.(updated)
    }
  }

  return (
    <div className="chip-list" ref={containerRef}>
      {visible.map(item => (
        <Chip
          key={item}
          label={item}
          selected={currentSelected?.includes(item)}
          onClick={() => toggleSelect(item)}
        />
      ))}

      {hidden.length > 0 && (
        <OverflowPopup
          hiddenItems={hidden}
          selectedItems={currentSelected}
          onSelect={toggleSelect}
          open={popupOpen}
          onOpenChange={setPopupOpen}
        />
      )}
    </div>
  )
}
