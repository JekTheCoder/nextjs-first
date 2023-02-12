import { usePokeScroll } from '@/hooks/use-poke-scroll'
import { FormEventHandler, useEffect, useState, ChangeEvent } from 'react'
import styles from './Poke-Scroll.module.css'

export default function PokeScroll() {
  const [pokemons, next, { isFetching }, setScrollLimit] = usePokeScroll(20)

  const [limitInput, [limit]] = useNumberInput(0)

  useEffect(() => {
    setScrollLimit(limit || 0)
  }, [setScrollLimit, limit])

  return (
    <>
      <div></div>
      {pokemons?.map(pokemon => (
        <p key={pokemon.name}>{JSON.stringify(pokemon)}</p>
      ))}

			{isFetching ? <span style={{color: 'red'}}>Loading...</span> : null}
      <button onClick={() => next()}>Next</button>
      <input type="text" {...limitInput} />
      <span>{limit}</span>
    </>
  )
}

function useNumberInput<T extends number | null>(initial: T) {
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
