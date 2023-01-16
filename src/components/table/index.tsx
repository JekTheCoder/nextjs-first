import { useEffect, useState } from 'react'
import Paginator, { PageEvent } from '../paginator'
import styles from './table.module.css'

export interface Row<T> {
  index: number
  data: T
}

export interface XPagination<T> {
  length: number
  rows: T[]
}

type Source<T> = (page: PageEvent) => Promise<XPagination<T>>
type RowFactory<T> = (row: T, index: number) => JSX.Element

interface TableProps<T> {
  source: Source<T>
  children: JSX.Element
  rowFactory: RowFactory<Row<T>>
  rowKey: (row: T) => any
}

export default function Table<T>({
  rowFactory: RowFactory,
  source,
  children,
  rowKey,
}: TableProps<T>): JSX.Element {
	

  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState<T[]>([])
  const [page, setPage] = useState(0)
  const [pageLength, setPageLength] = useState(0)
  const [pageSize, setPageSize] = useState(0)

  const setPageEvent = ({ page, length, pageSize }: PageEvent) => {
    setPage(page)
    setPageLength(length)
    setPageSize(pageSize)
  }

  useEffect(() => {
    setLoading(true)

    source({ page, length: pageLength, pageSize }).then(data => {
      const { rows, length } = data
      setPageLength(length)
      setData(rows)
      setLoading(false)
    })
  }, [source, page, pageLength, pageSize])

  return (
    <>
      <table className={styles.table}>
        {children}
        <tbody>
          {!isLoading
            ? data.map((row, i) => (
                <RowFactory key={rowKey(row)} data={row} index={i} />
              ))
            : null}
        </tbody>
        {isLoading ? <span>Loading....</span> : null}
      </table>
      <Paginator onChanges={setPageEvent} length={pageLength} />
    </>
  )
}
