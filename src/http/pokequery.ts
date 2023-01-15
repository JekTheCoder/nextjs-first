import { Pokemon } from '@/models/pokemon'
import { PokeQuery } from '@/models/pokemon-query'

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
