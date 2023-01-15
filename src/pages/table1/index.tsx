import Table, { Row } from '@/components/table'
import { getPokemonByUrl, pokeQuery } from '@/http/pokequery'
import { Pokemon } from '@/models/pokemon'
import styles from './Table1.module.scss'

type Data = Pokemon

export default function Table1() {
  return (
    <div className={styles.card}>
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

async function source(): Promise<Data[]> {
  const result = await pokeQuery()
  const pokemons = await Promise.all(
    result.results.map(r => getPokemonByUrl(r.url))
  )

	return pokemons
}

function Row({ data, index }: Row<Data>) {
  const { name, height, weight } = data

  return (
    <tr>
      <td>{index+1}</td>
      <td>{name}</td>
      <td>{height}</td>
      <td>{weight}</td>
    </tr>
  )
}
