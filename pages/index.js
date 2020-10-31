import Head from 'next/head';
import styles from './index.module.css';
import Link from 'next/link';
import Layout from '../components/layout';
import allSpecsData from '../specs/specs.json';
import cx from 'classnames';

function getUniqueValues(arr, key) {
  let uniqueValues = [];
  for (const item of arr) {
    const value = item[key];
    if (value && !uniqueValues.includes(value)) {
      uniqueValues.push(value);
    }
  }

  return uniqueValues;
}

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>Example API Directory</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.links}>
        {allSpecsData.map(({ id, label, isSystemApi }) => (
          <Link href={`/specs/${id}`} key={id}>
            <a className={styles.specLink}>
              {label}
              {isSystemApi && (
                <span className={styles.isSystemApi}>System API</span>
              )}
            </a>
          </Link>
        ))}
      </div>

      <footer className={styles.footer}></footer>
    </Layout>
  );
}
