import Link from 'next/link'
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>First NextJs Page</h1>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link className='link' href="about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
