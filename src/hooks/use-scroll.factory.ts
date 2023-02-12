import { useRef, useCallback } from 'react'
import { useInfiniteQuery } from 'react-query'

type GetterFn<T> = (limit: number, offset: number) => Promise<T[]>

export function scrollHookFactory<T>(querykey: string, getterFn: GetterFn<T>) {
	return (limit: number) => {
		const limitRef = useRef(limit)

		const setLimit = useCallback(
			(limit: number) => (limitRef.current = limit),
			[]
		)

		const { fetchNextPage, data, isLoading, isError, isFetching } = useInfiniteQuery(
			querykey,
			{
				queryFn: ({ pageParam }) => getterFn(limitRef.current, pageParam),
				getNextPageParam: (_, pages) => {
					const len = pages.reduce((acc, next) => acc + next.length, 0)
					return len > 1000 ? undefined : len
				},
			}
		)

		return [
			data?.pages.flat(),
			fetchNextPage,
			{ isLoading, isError, isFetching },
			setLimit,
		] as const
	}
}
