import { useEffect, useState } from 'react'
import Paginator, { PageEvent } from '../paginator'
import styles from './table.module.css'

export interface Row<T> {
  index: number
  data: T
}

type Source<T> = (page: PageEvent) => Promise<T[]>
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
  const [data, setData] = useState([] as T[])
  const [page, setPage] = useState<PageEvent>({
    page: 1,
    length: 0,
    pageSize: 10,
  })

  useEffect(() => {
    setLoading(true)

    source(page).then(data => {
      setData(data)
      setLoading(false)
    })
  }, [source, page])

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
      <Paginator onChanges={setPage} />
    </>
  )
}
