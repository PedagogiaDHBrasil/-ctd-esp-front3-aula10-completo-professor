import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Header.module.css";
import {
  defaultLocale,
  localeNames,
  locales,
  TEXTS_BY_LANGUAGE,
} from "../../locale/constants";

const Header: FC = () => {
  // Obtemos as informações do idioma usando useRouter()
  const { locale, asPath } = useRouter();

  // Acessamos os textos do Header que temos em nosso
  // constante, usando a linguagem como "key"
  const { HEADER } =
    TEXTS_BY_LANGUAGE[
      (locale || defaultLocale) as keyof typeof TEXTS_BY_LANGUAGE
    ];

  return (
    <header className={styles.header}>
      <div className={styles.leftSide}>
        <div className={styles.logo}>
          <figure>
            <Image
              src="/red.png"
              layout="fixed"
              width={50}
              height={50}
              alt="logo"
            />
          </figure>
        </div>
        {/* Atribuímos os nomes da barra de navegação
          dinamicamente usando as constantes */}
        <div className={styles.navbar}>
          <Link href="./">{HEADER.HOME}</Link>
          <Link href="./faqs">{HEADER.FAQS}</Link>
        </div>
      </div>
      <div className={styles.localeSwitch}>
        {/* Criamos o painel de botões para alterar o idioma.
             Através do atributo locale indicamos ao Next qual idioma queremos usar ao fazer o
             redirecionamento
            */}
        <Link href={asPath} locale={locales.ES_ES}>
          <p className={locale === locales.ES_ES ? styles.active : ""}>
            <Image
              src="/spanish.png"
              alt="spanish"
              layout="fixed"
              width={20}
              height={20}
            />
            {localeNames[locales.ES_ES as keyof typeof localeNames]}
          </p>
        </Link>
        <Link href={asPath} locale={locales.PT_BR}>
          <p className={locale === locales.PT_BR ? styles.active : ""}>
            <Image
              src="/brazil.png"
              alt="usa"
              layout="fixed"
              width={20}
              height={20}
            />
            {localeNames[locales.PT_BR as keyof typeof localeNames]}
          </p>
        </Link>
        <Link href={asPath} locale={locales.EN_US}>
          <p className={locale === locales.EN_US ? styles.active : ""}>
            <Image
              src="/usa.png"
              alt="usa"
              layout="fixed"
              width={20}
              height={20}
            />
            {localeNames[locales.EN_US as keyof typeof localeNames]}
          </p>
        </Link>
      </div>
    </header>
  );
};

export default Header;
