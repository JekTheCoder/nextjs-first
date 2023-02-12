import { ReactNode, Children } from 'react'
import styles from './card.module.scss'

export interface CardProps {
  header: JSX.Element
  content: JSX.Element
}

export default function Card({ header, content }: CardProps) {
  return (
    <article className={styles.card}>
      <div className="header">{header}</div>
      <div className="content">{content}</div>
    </article>
  )
}
