import { ChangeEvent, FormEventHandler, useState } from "react"

export default function useNumberInput<T extends number | null>(initial: T) {
  const [number, setNumber] = useState<number | null>(initial)
  const [rawValue, setRawValue] = useState('')
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const el = e.target

    setValue(Number(el.value) || null)
  }

  const setValue = (n: number | null) => {
    setRawValue(n?.toString() || '')
    setNumber(n)
  }

  const onBeforeInputCapture = ((e: InputEvent) => {
    const parsed = Number(e.data)
    if (isNaN(parsed)) e.preventDefault()
  }) as unknown as FormEventHandler

  return [
    { onChange, value: rawValue, onBeforeInputCapture },
    [number, setValue],
  ] as const
}
