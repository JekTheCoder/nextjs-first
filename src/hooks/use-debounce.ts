import { useState, Dispatch, SetStateAction } from 'react'

type SetFn<T> = (t: T) => T

export function useDebounce<T>(
  initial: T,
  ms: number
): [T, Dispatch<SetStateAction<T>>] {
  const [timeout, updateTimeout] = useState<NodeJS.Timeout | null>(null)
  const [t, rawSetT] = useState<T>(initial)

  const setT: Dispatch<SetStateAction<T>> = valueOrFn => {
    if (timeout) {
      clearTimeout(timeout)
    }

    const value: T =
      typeof valueOrFn === 'function' ? (valueOrFn as any)(t) : valueOrFn
    updateTimeout(setTimeout(() => rawSetT(value), ms))
  }

  return [t, setT]
}
