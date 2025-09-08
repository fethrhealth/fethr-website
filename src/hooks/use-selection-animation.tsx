'use client'

import { useState, useEffect } from 'react'

interface UseSelectionAnimationProps {
  autoSelect?: string[] // IDs to auto-select
  autoSelectDelay?: number
  showSelectionDelay?: number
  showBarDelay?: number
  autoClickDelay?: number
  onAutoClick?: () => void
  trigger?: boolean
}

interface UseSelectionAnimationReturn {
  selectedRows: Set<string>
  showSelection: boolean
  showSelectionBar: boolean
  buttonPressed: boolean
  setSelectedRows: (rows: Set<string>) => void
  setShowSelection: (show: boolean) => void
  setShowSelectionBar: (show: boolean) => void
  setButtonPressed: (pressed: boolean) => void
  reset: () => void
}

export const useSelectionAnimation = ({
  autoSelect = [],
  autoSelectDelay = 0,
  showSelectionDelay = 100,
  showBarDelay = 200,
  autoClickDelay = 500,
  onAutoClick,
  trigger = false
}: UseSelectionAnimationProps = {}): UseSelectionAnimationReturn => {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [showSelection, setShowSelection] = useState(false)
  const [showSelectionBar, setShowSelectionBar] = useState(false)
  const [buttonPressed, setButtonPressed] = useState(false)

  const logWithTime = (message: string) => {
    const timestamp = new Date().toISOString()
    const perfTime = performance.now().toFixed(1)
    console.log(`[${timestamp}] [${perfTime}ms] SELECTION: ${message}`)
  }

  // Reset when trigger becomes false
  useEffect(() => {
    if (!trigger) {
      logWithTime('Resetting selection animation state')
      setSelectedRows(new Set())
      setShowSelection(false)
      setShowSelectionBar(false)
      setButtonPressed(false)
    }
  }, [trigger])

  // Auto-selection sequence when triggered
  useEffect(() => {
    if (trigger && autoSelect.length > 0) {
      logWithTime(`Starting auto-selection sequence for: [${autoSelect.join(', ')}]`)
      
      const timer1 = setTimeout(() => {
        logWithTime('Auto-selecting rows and showing selection')
        setSelectedRows(new Set(autoSelect))
        setShowSelection(true)
      }, autoSelectDelay)

      const timer2 = setTimeout(() => {
        logWithTime('Showing selection bar')
        setShowSelectionBar(true)
      }, autoSelectDelay + showSelectionDelay)

      const timer3 = setTimeout(() => {
        logWithTime('Triggering auto-click')
        setButtonPressed(true)
        onAutoClick?.()
      }, autoSelectDelay + showSelectionDelay + showBarDelay + autoClickDelay)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
      }
    }
  }, [trigger, autoSelect, autoSelectDelay, showSelectionDelay, showBarDelay, autoClickDelay, onAutoClick])

  const reset = () => {
    logWithTime('Manual reset called')
    setSelectedRows(new Set())
    setShowSelection(false)
    setShowSelectionBar(false)
    setButtonPressed(false)
  }

  return {
    selectedRows,
    showSelection,
    showSelectionBar,
    buttonPressed,
    setSelectedRows,
    setShowSelection,
    setShowSelectionBar,
    setButtonPressed,
    reset
  }
}