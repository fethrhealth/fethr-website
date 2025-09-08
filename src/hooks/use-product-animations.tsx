'use client'

import { useState, useEffect, useRef } from 'react'

export type AnimationPhase = 'hidden' | 'entering' | 'visible' | 'exiting'

export interface ProductAnimationState {
  monitorPhase: 'hidden' | 'content-fading-in' | 'visible' | 'content-fading-out'
  workflowPhase: 'hidden' | 'sidebar-entering' | 'steps-fading-in' | 'running' | 'sidebar-exiting'
  tablesPhase: 'hidden' | 'content-fading-in' | 'visible' | 'content-fading-out'
  aiPhase: 'hidden' | 'sidebar-entering' | 'ai-running' | 'workflow-steps-appearing' | 'sidebar-exiting'
}

interface UseProductAnimationsProps {
  activeTab: number
  autoPlay?: boolean
  cycleDuration?: number
}

interface UseProductAnimationsReturn {
  animationStates: ProductAnimationState
  progress: number
  isAutoPlaying: boolean
  setIsAutoPlaying: (playing: boolean) => void
  resetAnimations: () => void
}

export const useProductAnimations = ({
  activeTab,
  autoPlay = true,
  cycleDuration = 5000
}: UseProductAnimationsProps): UseProductAnimationsReturn => {
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)
  const [progress, setProgress] = useState(0)
  const [animationStates, setAnimationStates] = useState<ProductAnimationState>({
    monitorPhase: 'hidden',
    workflowPhase: 'hidden',
    tablesPhase: 'hidden',
    aiPhase: 'hidden'
  })

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Progress tracking for auto-play
  useEffect(() => {
    if (!isAutoPlaying) return

    const updateProgress = () => {
      const currentTime = Date.now()
      const elapsed = currentTime - startTimeRef.current
      const newProgress = Math.min((elapsed / cycleDuration) * 100, 100)
      
      setProgress(newProgress)
      
      if (elapsed >= cycleDuration) {
        startTimeRef.current = currentTime
      }
    }

    startTimeRef.current = Date.now()
    setProgress(0)
    
    intervalRef.current = setInterval(updateProgress, 16)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [activeTab, isAutoPlaying, cycleDuration])

  // Monitor animations
  useEffect(() => {
    if (activeTab === 0) {
      const timer1 = setTimeout(() => {
        setAnimationStates(prev => ({ ...prev, monitorPhase: 'content-fading-in' }))
      }, 500)
      
      const timer2 = setTimeout(() => {
        setAnimationStates(prev => ({ ...prev, monitorPhase: 'visible' }))
      }, 1000)
      
      const timer3 = setTimeout(() => {
        setAnimationStates(prev => ({ ...prev, monitorPhase: 'content-fading-out' }))
      }, 4500)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
      }
    } else {
      setAnimationStates(prev => ({ ...prev, monitorPhase: 'hidden' }))
    }
  }, [activeTab])

  // Workflow animations
  useEffect(() => {
    if (activeTab === 1) {
      setAnimationStates(prev => ({ ...prev, workflowPhase: 'sidebar-entering' }))
      
      const timer1 = setTimeout(() => {
        setAnimationStates(prev => ({ ...prev, workflowPhase: 'steps-fading-in' }))
      }, 250)
      
      const timer2 = setTimeout(() => {
        setAnimationStates(prev => ({ ...prev, workflowPhase: 'running' }))
      }, 1250)
      
      const timer3 = setTimeout(() => {
        setAnimationStates(prev => ({ ...prev, workflowPhase: 'sidebar-exiting' }))
      }, 4500)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
      }
    } else {
      setAnimationStates(prev => ({ ...prev, workflowPhase: 'hidden' }))
    }
  }, [activeTab])

  // Tables animations
  useEffect(() => {
    if (activeTab === 2) {
      const timer1 = setTimeout(() => {
        setAnimationStates(prev => ({ ...prev, tablesPhase: 'content-fading-in' }))
      }, 500)
      
      const timer2 = setTimeout(() => {
        setAnimationStates(prev => ({ ...prev, tablesPhase: 'visible' }))
      }, 1000)
      
      const timer3 = setTimeout(() => {
        setAnimationStates(prev => ({ ...prev, tablesPhase: 'content-fading-out' }))
      }, 4500)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
      }
    } else {
      setAnimationStates(prev => ({ ...prev, tablesPhase: 'hidden' }))
    }
  }, [activeTab])

  // AI animations
  useEffect(() => {
    if (activeTab === 3) {
      setAnimationStates(prev => ({ ...prev, aiPhase: 'ai-running' }))
      
      const timer1 = setTimeout(() => {
        setAnimationStates(prev => ({ ...prev, aiPhase: 'workflow-steps-appearing' }))
      }, 3500)
      
      const timer2 = setTimeout(() => {
        setAnimationStates(prev => ({ ...prev, aiPhase: 'sidebar-exiting' }))
      }, 4500)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    } else {
      setAnimationStates(prev => ({ ...prev, aiPhase: 'hidden' }))
    }
  }, [activeTab])

  const resetAnimations = () => {
    setAnimationStates({
      monitorPhase: 'hidden',
      workflowPhase: 'hidden',
      tablesPhase: 'hidden',
      aiPhase: 'hidden'
    })
    setProgress(0)
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current)
    }
  }

  return {
    animationStates,
    progress,
    isAutoPlaying,
    setIsAutoPlaying,
    resetAnimations
  }
}