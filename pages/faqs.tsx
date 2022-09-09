import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { FAQSAPIResponse } from "../types";
import styles from "../styles/Faqs.module.css";
import { useRouter } from "next/router";
import { defaultLocale, TEXTS_BY_LANGUAGE } from "../locale/constants";

export interface IProps {
  data: FAQSAPIResponse;
}

const FAQS: NextPage<IProps> = ({ data }) => {
  // Obtemos as informações do idioma usando useRouter()
  const { locale } = useRouter();

  // Acessamos os textos do Header que temos em nosso
  // constante, usando a linguagem como "key"
  const { FAQS } =
    TEXTS_BY_LANGUAGE[
      (locale || defaultLocale) as keyof typeof TEXTS_BY_LANGUAGE
    ];

  return (
    <div className={styles.container}>
      <Head>
        {/* Atribuímos os valores dinamicamente */}
        <title>{`RandomIn - ${FAQS.TITLE}`}</title>
        <meta name="description" content={FAQS.DESCRIPTION} />
      </Head>
      {/* Atribuímos os valores dinamicamente */}
      <h2 className={styles.colorText}>{FAQS.TITLE}</h2>
      {data.map(({ id, title, description }) => (
        <div key={id}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      ))}
    </div>
  );
};

// Acessamos a propriedade "locale" encontrada
// dentro do contexto do método getStaticProps
export async function getStaticProps({
  locale,
}: {
  locale: string;
}): Promise<{ props: { data: FAQSAPIResponse } }> {
  const baseUrl = "http://localhost:3000/"; // Mude para a url do projeto assim que a API for implantada

  // Fazemos a requisição adicionando o idioma que recebemos
  // do contexto.
  const response = await fetch(`${baseUrl}/api/faqs/${locale}`);

  const data = await response.json();

  return {
    props: { data },
  };
}

export default FAQS;
