import '@/styles/globals.scss'
import styles from '@/styles/App.module.scss'
import type { AppProps } from 'next/app'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.container}>
        <Component {...pageProps} />
      </div>
			<Footer />
    </ div>
  )
}
