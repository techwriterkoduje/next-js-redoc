import Head from 'next/head';
import styles from './layout.module.css';
import Link from 'next/link';
import logo from '../public/images/logo.png';

const name = 'Example API Directory';
export const siteTitle = 'API Directory';

export default function Layout({ children, home }) {
  return (
    <div className={styles.wrapper}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Browse example API specs" />
        <meta name="og:title" content={siteTitle} />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img src={logo} alt={name} />
            <div className={styles.logoTitle}>
              <Link href="/">
                <a>{name}</a>
              </Link>
            </div>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <img src={logo} alt={name} />
              </a>
            </Link>
            <div className={styles.logoTitle}>
              <Link href="/">
                <a>{name}</a>
              </Link>
            </div>
          </>
        )}
        <Link href="/specs.zip">
          <a className={styles.downloadLink}>Download all specs as a zip</a>
        </Link>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <div>
          <a href="https://techwriterkoduje.pl" target="_blank">
            A podcast for technical writers in Polish
          </a>
        </div>
      </footer>
    </div>
  );
}
