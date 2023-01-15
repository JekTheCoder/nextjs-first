import { Component } from 'react'
import styles from './table.module.css'

export interface Row<T> {
  index: number
  data: T
}

type Source<T> = () => T[]
type RowFactory<T> = (row: T, index: number) => JSX.Element

interface TableProps<T> {
  source: Source<T>
  children: JSX.Element
  RowFactory: RowFactory<Row<T>>
  rowKey: (row: T) => any
}

export default function Table<T>({
  RowFactory,
  source,
  children,
  rowKey,
}: TableProps<T>): JSX.Element {
  return (
    <table className={styles.table}>
      {children}
      <tbody>
        {source().map((row, i) => (
          <RowFactory key={rowKey(row)} data={row} index={i} />
        ))}
      </tbody>
    </table>
  )
}
