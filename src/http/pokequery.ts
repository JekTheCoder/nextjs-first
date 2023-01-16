import { Pokemon } from '@/models/pokemon'
import { PokeQuery, Result } from '@/models/pokemon-query'

export function pokeQuery(offset = 0, limit = 20): Promise<PokeQuery> {
  return fetch(
    'https://pokeapi.co/api/v2/pokemon?offset=' + offset + '&limit=' + limit
  ).then(res => res.json())
}

export function getPokemon(idOrName: string | number): Promise<Pokemon> {
  return fetch('https://pokeapi.co/api/v2/pokemon/' + idOrName).then(res =>
    res.json()
  )
}

export function getPokemonByUrl(url: string): Promise<Pokemon> {
  return fetch(url).then(res => res.json())
}

const STEP_SIZE = 10;
const MAX_REQ = 10

export async function pokeQueryFilter(
  offset = 0,
  limit = 20,
  name = ''
): Promise<Pokemon[]> {
	let maxReq = MAX_REQ

  const { results } = await pokeQuery(offset, limit)
  let pokemons = results.filter(p => p.name.includes(name))
	let _offset = offset + results.length;

  if (pokemons.length >= limit)
    return Promise.all(pokemons.map(resultIntoPokemon))

	while (pokemons.length < limit && maxReq > 0) {
		const { results: _results } = await pokeQuery(_offset, STEP_SIZE)
		const filtered = _results.filter(p => p.name.includes(name))

		_offset += STEP_SIZE
		pokemons.push(...filtered)
		maxReq--
	}

	return Promise.all(pokemons.map(resultIntoPokemon))
}

function resultIntoPokemon(result: Result) {
  return getPokemonByUrl(result.url)
}
