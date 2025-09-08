'use client'

import { useState, useEffect } from 'react'

interface UseStaggeredEntranceProps {
  itemCount: number
  staggerDelay?: number
  trigger: boolean
  onComplete?: () => void
}

interface StaggeredItem {
  index: number
  visible: boolean
  delay: string
}

interface UseStaggeredEntranceReturn {
  items: StaggeredItem[]
  isComplete: boolean
  reset: () => void
}

export const useStaggeredEntrance = ({
  itemCount,
  staggerDelay = 150,
  trigger,
  onComplete
}: UseStaggeredEntranceProps): UseStaggeredEntranceReturn => {
  const [items, setItems] = useState<StaggeredItem[]>([])
  const [isComplete, setIsComplete] = useState(false)

  // Initialize items array
  useEffect(() => {
    const initialItems = Array.from({ length: itemCount }, (_, index) => ({
      index,
      visible: false,
      delay: `${index * staggerDelay}ms`
    }))
    setItems(initialItems)
  }, [itemCount, staggerDelay])

  // Handle trigger and staggered visibility
  useEffect(() => {
    if (!trigger) {
      setItems(prev => prev.map(item => ({ ...item, visible: false })))
      setIsComplete(false)
      return
    }

    // Start showing items with staggered delays
    items.forEach((item, index) => {
      const timeout = setTimeout(() => {
        setItems(prev => prev.map(prevItem => 
          prevItem.index === index 
            ? { ...prevItem, visible: true }
            : prevItem
        ))

        // Check if this is the last item
        if (index === itemCount - 1) {
          // Wait for transition duration before marking complete
          const completeTimeout = setTimeout(() => {
            setIsComplete(true)
            onComplete?.()
          }, 300) // Transition duration

          return () => clearTimeout(completeTimeout)
        }
      }, index * staggerDelay)

      return () => clearTimeout(timeout)
    })
  }, [trigger, items.length, itemCount, staggerDelay, onComplete])

  const reset = () => {
    setItems(prev => prev.map(item => ({ ...item, visible: false })))
    setIsComplete(false)
  }

  return {
    items,
    isComplete,
    reset
  }
}