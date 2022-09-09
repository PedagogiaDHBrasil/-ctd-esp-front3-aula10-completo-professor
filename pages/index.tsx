import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { defaultLocale, TEXTS_BY_LANGUAGE } from "../locale/constants";
import styles from "../styles/Home.module.css";

type User = {
  email: string;
  picture: {
    medium: string;
  };
  name: {
    first: string;
    last: string;
  };
  login: {
    username: string;
  };
};

export interface IProps {
  data: { results: User[] };
}

const Home: NextPage<IProps> = ({ data: { results } }) => {
  // Obtemos as informações do idioma usando useRouter()
  const { locale } = useRouter();

  // Acessamos os textos do Header que temos em nosso
  // constante, usando a linguagem como "key"
  const { MAIN } =
    TEXTS_BY_LANGUAGE[
      (locale || defaultLocale) as keyof typeof TEXTS_BY_LANGUAGE
    ];

  const renderResults = () =>
    results.map(
      ({
        email,
        picture: { medium },
        name: { first, last },
        login: { username },
      }) => (
        <div className={styles.card} key={username}>
          <picture className={styles.avatar}>
            <Image
              src={medium}
              alt={first}
              layout="fixed"
              width={100}
              height={100}
            />
          </picture>
          <h2>{`${first} ${last}`}</h2>
          <p>{username}</p>
          <p>{email}</p>
        </div>
      )
    );

  return (
    <div className={styles.container}>
      <Head>
        <title>RandomIn</title>
        {/* Atribuímos a metatag dinamicamente usando
             nossa constante */}
        <meta name="description" content={MAIN.DESCRIPTION} />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Random<span className={styles.highlight}>In</span>
        </h1>
        {/* Atribuímos a metatag dinamicamente usando
             nossa constante */}
        <p className={styles.description}>{MAIN.SUBTITLE}</p>

        <div className={styles.grid}>{renderResults()}</div>
      </main>
      <footer className={styles.footer}>
        <b>
          Feito com
          <span className={styles.logo}>
            <Image src="/heart.png" alt="Vercel Logo" width={20} height={20} />
          </span>
          por DH
        </b>
      </footer>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`https://randomuser.me/api/?results=10`);
  const data = await res.json();

  return { props: { data } };
}

export default Home;
