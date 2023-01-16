import { PageEvent } from '@/components/paginator'
import Table, { Row, XPagination } from '@/components/table'
import { useDebounce } from '@/hooks/use-debounce'
import { getPokemonByUrl, pokeQuery, pokeQueryFilter } from '@/http/pokequery'
import { Pokemon } from '@/models/pokemon'
import { useEffect } from 'react'
import { useMemo, useState } from 'react'
import styles from './Table1.module.scss'

type Data = Pokemon

export default function Table1() {
	const [nameD, setNameD] = useDebounce('', 2000)

  const source = useMemo(
    () => (page: PageEvent) => getPokemon(page, nameD),
    [nameD]
  )


  return (
    <div className={styles.card}>
      <input type="text" onChange={e => setNameD(e.target.value)} />
      <Table source={source} rowFactory={Row} rowKey={data => data.name}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Actions</th>
          </tr>
        </thead>
      </Table>
    </div>
  )
}

async function getPokemon(
  { page, pageSize }: PageEvent,
  name: string
): Promise<XPagination<Data>> {
  const pokemons = await pokeQueryFilter((page - 1) * pageSize, pageSize, name)

  return {
    length: 151,
    rows: pokemons,
  }
}

function Row({ data, index }: Row<Data>) {
  const { name, height, weight, id } = data

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{height}</td>
      <td>{weight}</td>
    </tr>
  )
}
