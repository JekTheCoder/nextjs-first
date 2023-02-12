import { useEffect } from 'react'
import styles from './Poke-Scroll.module.css'

import Card from '@/components/card'
import { usePokeScroll } from '@/hooks/use-poke-scroll'
import useNumberInput from '@/hooks/inputs/use-number-input'
import Image from 'next/image'
import { Result } from '@/models/pokemon-query'

export default function PokeScroll() {
  const [pokemons, next, { isFetching }, setScrollLimit] = usePokeScroll(20)

  const [limitInput, [limit]] = useNumberInput(0)

  useEffect(() => {
    setScrollLimit(limit || 0)
  }, [setScrollLimit, limit])

  return (
    <>
      <div className={styles.pokeGrid}>
        {pokemons?.map(pokemon => (
          <PokeCard {...pokemon} key={pokemon.name} />
        ))}
      </div>

      {isFetching && <span style={{ color: 'red' }}>Loading...</span>}
      <button onClick={() => next()}>Next</button>
      <input type="text" {...limitInput} />
      <span>{limit}</span>
    </>
  )
}

interface PokeHeaderProps {
  name: string
}

function PokeHeader({ name }: PokeHeaderProps) {
  return <h1>{name}</h1>
}

interface PokeContentProps {
  id: number
  name: string
}
function PokeContent({ id, name }: PokeContentProps) {
  const src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

  return <Image src={src} alt={name} width={100} height={100} />
}

const START = 34
function idFromUrl(url: string): number {
  const limiter = url.indexOf('/', START)
  if (limiter === -1) throw new Error()

  const idStr = url.slice(START, limiter)
  const id = Number(idStr)

  if (isNaN(id)) throw new Error()

  return id
}

function PokeCard(pokemon: Result) {
  const id = idFromUrl(pokemon.url)

  return (
    <Card
      key={pokemon.name}
      header={<PokeHeader name={pokemon.name} />}
      content={<PokeContent name={pokemon.name} id={id} />}
    ></Card>
  )
}
