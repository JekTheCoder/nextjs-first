import Link from 'next/link'
import styles from './Header.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href={'/'}>
        <h1>FNP</h1>
				<h2 className={styles.subtitle}>First Nextjs Page</h2>
      </Link>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link className="link" href={'/'}>
              Home
            </Link>
          </li>
          <li>
            <Link className="link" href="about">
              About
            </Link>
          </li>
					<li>
						<Link className='link' href={'table1'}>Tabla 1</Link>
					</li>
					<li>
						<Link className='link' href={'debounce-input'}>Debounce Input</Link>
					</li>
					<li>
						<Link className='link' href={'Poke-Scroll'}>PokeScroll</Link>
					</li>
        </ul>
      </nav>
    </header>
  )
}
