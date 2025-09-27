import { useState, useEffect, useRef } from 'react'

export function useLocalStorage<T>(key: string, defaultValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return typeof defaultValue === 'function'
        ? (defaultValue as () => T)()
        : defaultValue
    }

    try {
      const stored = window.localStorage.getItem(key)
      if (stored !== null) {
        return JSON.parse(stored)
      }
    } catch (error) {
      console.warn(`Failed to parse localStorage key "${key}":`, error)
      window.localStorage.removeItem(key)
    }

    return typeof defaultValue === 'function'
      ? (defaultValue as () => T)()
      : defaultValue
  })

  const prevKeyRef = useRef(key)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const prevKey = prevKeyRef.current
    if (key !== prevKey) {
      window.localStorage.removeItem(prevKey)
      prevKeyRef.current = key
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        console.error('localStorage quota exceeded for key:', key)
      } else {
        console.error('Failed to save to localStorage:', error)
      }
    }
  }, [key, value])

  // Cross-tab synchronization
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key !== key) return

      if (e.newValue === null) {
        // Key was deleted in another tab
        setValue(
          typeof defaultValue === 'function'
            ? (defaultValue as () => T)()
            : defaultValue
        )
      } else {
        try {
          setValue(JSON.parse(e.newValue))
        } catch (error) {
          console.warn(
            `Failed to parse updated localStorage key "${key}":`,
            error
          )
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key, defaultValue])

  return [value, setValue] as const
}
