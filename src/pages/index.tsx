import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>First nextjs Page</h1>
      <Link href="about">wee</Link>
    </div>
  )
}
