import '@/styles/globals.scss'
import styles from '@/styles/App.module.css'
import type { AppProps } from 'next/app'
import Header from '@/components/layout/header'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Component {...pageProps} />
      </div>
    </>
  )
}
