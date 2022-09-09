import type { NextApiRequest, NextApiResponse } from "next";
import { FAQSAPIResponse } from "../../../types";
import { defaultLocale } from "../../../locale/constants";
import { faqs } from "../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FAQSAPIResponse>
) {
  // Obtemos o idioma que receberemos como parâmetro
  // no request
  const {
    query: { lan },
  } = req;

  // Usamos o idioma como "key" para acessar as informações.
  // caso não exista, retornamos as informações no
  // idioma padrão.
  const faqsByLanguage = faqs[lan as string] ?? faqs[defaultLocale];

  res.status(200).json(faqsByLanguage);
}
