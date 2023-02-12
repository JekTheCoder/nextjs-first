import { pokeQuery } from '@/http/pokequery'
import { scrollHookFactory } from './use-scroll.factory'

export const usePokeScroll = scrollHookFactory('pokequery', (limit, offset) =>
  pokeQuery(offset, limit).then(query => query.results)
)
