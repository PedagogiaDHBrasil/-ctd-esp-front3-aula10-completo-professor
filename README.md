# Especialização Frontend III - Semana 4 - Aula 10

## Base para o exercício (Professor)

Nesta aula, vamos retornar ao projeto de aula 6 (RandomIn), para que o professor possa fazer uma breve revisão dos tópicos aplicados. Além disso, adicionaremos novas funcionalidades que envolvem o uso de API Routes e internacionalização.

### Etapa 0: Revisão.

O primeiro passo é passar pelo estado do aplicativo para revisar os conceitos básicos relacionados ao uso de Next Js como: roteamento, ativos e metadados.

Para isso, o professor pode, por exemplo, começar mostrando as duas páginas que são criadas dentro da pasta _pages_, referindo-se a cada um dos caminhos do aplicativo. Além disso, dentro do componente <Header> encontrado na pasta _components_, você pode ver o uso da tag <Link> para vincular cada um deles na barra de navegação.

A seguir, explica-se o uso do componente <Layout>, que está localizado dentro da mesma pasta, que é usada para compartilhar o mesmo cabeçalho entre todas as páginas. Você pode ver como este componente é usado dentro do arquivo _\_app.tsx_ localizado dentro da pasta _pages_.

Em terceiro lugar, o uso de metadados pode ser explicado a partir de dois pontos de vista: primeiro, usando o arquivo _\_document.tsx_ com a finalidade de compartilhar o favicon em toda a aplicação; a segunda, usando a tag <Head> em cada uma das páginas (index.tsx e faqs.tsx), para adicionar o título junto com uma descrição particular para cada uma delas.

O logotipo do aplicativo encontrado no <Header> também pode ser usado para explicar o uso da tag de imagem. Aqui é importante mencionar onde devemos colocar nossas imagens (dentro da pasta _public_) para usá-las posteriormente.

Dentro da pasta _styles_ temos arquivos css que usam estilos locais (para cada componente) e globais, que podem ser usados ​​para revisar este tópico.

Finalmente, podemos passar um momento analisando o uso das técnicas de _pre-fetching_ que estamos usando nos componentes _faqs.tsx_ e _index.tsx_ (getServerSideProps e getStaticProps), explicando as diferenças e os casos de uso de cada um.

### Etapa 1: Implementamos um novo recurso.

Concluída a revisão, vamos implementar uma nova funcionalidade. Consiste em adicionar i18n para alterar os textos dependendo do idioma que a pessoa selecionar. Vamos fazer isso a partir de dois pontos de vista: primeiro, dinamizando os textos no frontend para que eles mudem de acordo com a seleção; segundo, "modificar" a API que retorna as perguntas mais frequentes, para que venham no idioma selecionado. Estes são os passos a seguir para realizar esta tarefa:

_Adicionamos constantes_
Vamos criar uma pasta _locale_ na raiz da aplicação e, dentro dela, criamos um arquivo _constants.ts_. Nele, criamos algumas constantes que nos permitirão tornar o conteúdo dinâmico:

```javascript
// Idiomas que o app irá suportar
const EN_US = "en-US";
const ES_ES = "es-ES";
const PT_BR = "pt-BR";

// idioma padrão
export const defaultLocale = ES_ES;

// Salvamos os idiomas em um objeto
// para exportá-los todos juntos
exportar consts locais = {
  EM NÓS,
  ES_ES,
  PT_BR,
};

// Salvamos os nomes de cada idioma
// para usar no teclado
export const localeNames = {
  [PT_US]: "Inglês",
  [ES_ES]: "Espanhol",
  [PT_BR]: "Português",
};

// Salvamos os diferentes textos que usamos
// em todo o aplicativo
export const TEXTS_BY_LANGUAGE = {
  [EM NÓS]: {
    // Menu de navegação
    CABEÇALHO: {
      CASA: "Casa",
      Perguntas frequentes: "FAQS",
    },
    A PRINCIPAL: {
      // Para a metatag inicial
      DESCRIÇÃO:
        "Um site onde você pode se conectar com outras pessoas de forma rápida e fácil",
      // Para a apresentação da página que vai sob o título
      LEGENDA:
        "Aqui você pode encontrar os usuários mais recentes que se juntaram à nossa rede",
    },
    Perguntas frequentes: {
      // Título da página de perguntas frequentes
      TÍTULO: "Perguntas Frequentes",
      // Para a meta tag desta página
      DESCRIÇÃO: "Perguntas frequentes sobre o uso do aplicativo RandomIn",
    },
  },
  [ES_ES]: {
    CABEÇALHO: {
      HOME: "Página inicial",
      Perguntas frequentes: "Perguntas frequentes",
    },
    A PRINCIPAL: {
      DESCRIÇÃO:
        "Um site onde você pode se conectar com outras pessoas de forma rápida e fácil",
      LEGENDA:
        "Aqui você pode encontrar os usuários mais recentes que ingressaram na rede",
    },
    Perguntas frequentes: {
      TÍTULO: "Perguntas Frequentes",
      DESCRIÇÃO: "Perguntas frequentes sobre o uso do aplicativo RandomIn",
    },
  },
  [PT_BR]: {
    CABEÇALHO: {
      HOME: "Página inicial",
      FAQS: "Perguntas Frequentes",
    },
    A PRINCIPAL: {
      DESCRIÇÃO:
        "Um site onde você pode se conectar com outras pessoas de forma rápida e fácil",
      LEGENDA:
        "Aqui você pode encontrar os usuários mais recentes que entraram na rede",
    },
    Perguntas frequentes: {
      TÍTULO: "Perguntas Frequentes",
      DESCRIÇÃO: "Perguntas frequentes sobre o uso da web RandomIn",
    },
  },
};
```

Este arquivo já está no projeto base, mas pode ser mostrado aos alunos, pois será usado em outro lugar posteriormente.

_Ativamos i18n_
Para habilitar o uso de i18n dentro do Next, vamos adicionar a configuração necessária dentro do arquivo _next.config.js_

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  imagens: {
    domínios: ["randomuser.me"],
  },
  reactStrictMode: true,
  i18n: {
    // Adicionamos à lista de idiomas que suportaremos
    localidades: ["en-US", "es-ES", "pt-BR"],
    // Escolhemos o valor padrão quando acessamos uma rota que não possui o valor de localidade definido
    defaultLocale: "en-ES",
  },
};

module.exports = nextConfig;
```

_Modificamos o cabeçalho_

Agora que habilitamos o i18n, vamos modificar o componente <Header> para torná-lo dinâmico e, além disso, poder adicionar o painel de botões que nos permitirá alterar o idioma. Para fazer isso, usaremos _useRouter()_ que nos permitirá detectar o idioma selecionado, juntamente com as constantes que criamos anteriormente.

_Header.tsx_

```jsx
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
  // Buscamos as informações do idioma usando useRouter()
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
```

Ao final desta etapa, podemos alterar o idioma clicando nos botões e veremos como Next modifica a URL adicionando o idioma selecionado.

_Modificamos os componentes index.tsx e faqs.tsx_
Vamos cuidar de tornar mais dinâmicos os textos das duas páginas que temos. Para isso, usaremos a mesma lógica do cabeçalho, usando _useRouter()_ para obter o idioma e acessar os textos usando essas informações:

_index.tsx_

```jsx
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
       {/* Atribuímos a legenda dinamicamente usando
             nossa constante */}
        <p className={styles.description}>{MAIN.SUBTITLE}</p>

        <div className={styles.grid}>{renderResults()}</div>
      </main>
      <footer className={styles.footer}>
        <b>
          Hecho con
          <span className={styles.logo}>
            <Image src="/heart.png" alt="Vercel Logo" width={20} height={20} />
          </span>
          por DH
        </b>
      </footer>
    </div>
  );
};
```

_faqs.tsx_

```jsx
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
```

Com isso, terminamos de tornar o conteúdo dinâmico na frente. Agora, vamos para a API de FAQS.

_Criamos uma rota de API dinâmica para o FAQS_

Até agora, nosso aplicativo consumia um endpoint que retornava perguntas frequentes em um único idioma. Vamos mudar isso criando uma API Route que recebe o idioma como parâmetro de consulta e, com base nele, retorna as informações no idioma correspondente. Como ponto de partida, dentro da pasta _pages/api_ temos o arquivo _db.ts_, que contém as informações de cada idioma. Este arquivo já está criado, mas pode ser mostrado aos alunos, pois o usaremos posteriormente em nossa API de rota.

Como o que procuramos é uma rota dinâmica que receba a linguagem como parâmetro, vamos criar um arquivo com a seguinte estrutura: `pages/api/faqs/[lan].ts`. Isso nos permitirá acessar dinamicamente o valor que está na última posição da nossa rota.

Dentro do arquivo _[lan].ts_ criamos nosso handler, obtendo o valor da linguagem e retornando o conteúdo baseado nele.

_[lan].ts_

```javascript
import type { NextApiRequest, NextApiResponse } from "next";
import { FAQSAPIResponse } from "../../../types";
import { defaultLocale } from "../../../locale/constants";
import { faqs } from "../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FAQSAPIResponse>
) {
// Obtemos o idioma que receberemos como parâmetro
   // no pedido
  const {
    query: { lan },
  } = req;

  // Usamos o idioma como "key" para acessar as informações.
   // caso não exista, retornamos as informações no
   // idioma padrão.
  const faqsByLanguage = faqs[lan as string] ?? faqs[defaultLocale];

  res.status(200).json(faqsByLanguage);
}
```

Agora que temos esta etapa concluída, vamos modificar o método _getStaticProps_ do componente _faqs.tsx_ para poder enviar o idioma dentro da solicitação.

_faqs.tsx_

```javascript
// Acessamos a propriedade "locale" encontrada
// dentro do contexto do método getStaticProps
export async function getStaticProps({
  locale,
}: {
  locale: string,
}): Promise<{ props: { data: FAQSAPIResponse } }> {
  const baseUrl = "http://localhost:3000/"; // Mude para o URL do projeto depois que a API for implantada

  // Fazemos a requisição adicionando o idioma que recebemos
  // do contexto.
  const response = await fetch(`${baseUrl}/api/faqs/${locale}`);

  const data = await response.json();

  return {
    props: { data },
  };
}
```

Desta forma, podemos ver que cada vez que mudamos o idioma, o conteúdo da página é modificado com base nessa seleção.

### Extra: Implantação em Vercel.

Agora que temos nosso aplicativo em execução localmente, podemos implantá-lo no Vercel. Esta etapa é opcional com base no tempo de aula disponível.
Lembre-se de que precisaremos primeiro realizar uma primeira implantação para poder obter a url e, em seguida, modificar a url base dentro do componente _faqs.tsx_ para que ele consuma essa rota em vez de localhost):

```javascript
const baseUrl = "http://localhost:3000/"; // Mude para uma url do projeto assim que a API for implementada
```

Mudando isso, fazemos um push, aguardamos a implantação e nosso aplicativo deve estar funcionando perfeitamente no ambiente Vercel.

Você pode ver o projeto finalizado dentro do branch _"exercise-completed"_.
