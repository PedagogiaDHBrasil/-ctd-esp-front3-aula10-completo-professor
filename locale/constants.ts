// Idiomas que o aplicativo suportará
const EN_US = "en-US";
const ES_ES = "es-ES";
const PT_BR = "pt-BR";

// Idioma padrão
export const defaultLocale = PT_BR;

// Salvamos os idiomas em um objeto
// para exportá-los todos juntos
export const locales = {
  EN_US,
  ES_ES,
  PT_BR,
};

// Salvamos os nomes de cada idioma
// para usar no teclado
export const localeNames = {
  [EN_US]: "English",
  [ES_ES]: "Español",
  [PT_BR]: "Português",
};

// Salvamos os diferentes textos que usamos
// em todo o aplicativo
export const TEXTS_BY_LANGUAGE = {
  [EN_US]: {
    //Menu de navegação
    HEADER: {
      HOME: "Home",
      FAQS: "FAQS",
    },
    MAIN: {
      // Para a metatag inicial
      DESCRIPTION:
        "A website where you can connect with other people quickly and easily",
      // Para a apresentação da página que vai sob o título
      SUBTITLE:
        "Here you can find the latest users who have joined our network",
    },
    FAQS: {
      //Título da página de perguntas frequentes
      TITLE: "Frequently Asked Questions",
      // Para a metatag desta página
      DESCRIPTION: "Frequently asked questions about using the RandomIn app",
    },
  },
  [ES_ES]: {
    HEADER: {
      HOME: "Página principal",
      FAQS: "Preguntas frecuentes",
    },
    MAIN: {
      DESCRIPTION:
        "Una web en donde podrás conectar con otras personas de forma rápida y sencilla",
      SUBTITLE:
        "Aqui podrás encontrar los últimos usuarios que se han unido a la red",
    },
    FAQS: {
      TITLE: "Preguntas Frecuentes",
      DESCRIPTION: "Preguntas frecuentes del uso de la app RandomIn",
    },
  },
  [PT_BR]: {
    HEADER: {
      HOME: "Página principal",
      FAQS: "Perguntas Freqüentes",
    },
    MAIN: {
      DESCRIPTION:
        "Um site onde você pode se conectar com outras pessoas de forma rápida e fácil",
      SUBTITLE:
        "Aqui você pode encontrar os usuários mais recentes que ingressaram na rede",
    },
    FAQS: {
      TITLE: "Perguntas Freqüentes",
      DESCRIPTION: "Perguntas frequentes sobre o uso do web RandomIn",
    },
  },
};
