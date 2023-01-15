import { useEffect, useMemo, useState } from 'react'
import styles from './paginator.module.css'

export interface PageEvent {
  page: number
  length: number
  pageSize: number
}

type PaginatorProps = {
  className?: string
  onChanges: (e: PageEvent) => void
} & Partial<PageEvent>

export default function Paginator({
  className,
  onChanges,
  length = 0,
}: PaginatorProps) {
  const klass = useMemo(
    () => [styles.paginator, className].join(' '),
    [className]
  )
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const backDisabled = useMemo(() => page <= 1, [page])
  const fowardDisabled = useMemo(
    () => length < page * pageSize,
    [page, length, pageSize]
  )

  useEffect(
    () => onChanges({ page, length, pageSize }),
    [page, length, pageSize, onChanges]
  )

  return (
    <div className={klass}>
      <button disabled={backDisabled} onClick={() => setPage(page => page - 1)}>
        &gt;
      </button>
      <select value={pageSize} onChange={e => setPageSize(+e.target.value)}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>

      <span>
        Page {page} of {length} elements
      </span>
      <button
        disabled={fowardDisabled}
        onClick={() => setPage(page => page + 1)}
      >
        &gt;
      </button>
    </div>
  )
}
