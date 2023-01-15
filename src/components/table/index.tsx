import { useEffect, useState } from 'react'
import styles from './table.module.css'

export interface Row<T> {
  index: number
  data: T
}

type Source<T> = () => Promise<T[]>
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

  useEffect(() => {
    setLoading(true)

    source().then(data => {
      setData(data)
      setLoading(false)
    })
  }, [source])

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
			<span>paginator</span>
    </>
  )
}
