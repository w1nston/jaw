import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

// <div className={styles.container}>

export default function Home() {
  return (
    <div>
      <Head>
        <title>JAW</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <header className={styles.header}>
        <Image src="/logo.svg" alt="logo" width={80} height={80} />
      </header>

      <main>
        <h1>TODO: Something...</h1>
      </main>
    </div>
  );
}
