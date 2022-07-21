import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Template Builder</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Template Builder!</a>
        </h1>

        <p className={styles.description}>
          Get started from{" "}
          <Link href="/admin">
            <a>&rarr; admin</a>
          </Link>{" "}
          page
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/hoai97nam"
          target="_blank"
          rel="noopener noreferrer"
        >
          Author Nguyen Hoai Nam
        </a>
      </footer>
    </div>
  );
}
