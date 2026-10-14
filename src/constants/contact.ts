export const WHATSAPP_NUMBER = '5511977179072'

// Mensagem e link padrão para multipropriedade (rota "/")
export const WHATSAPP_DEFAULT_MESSAGE =
  'Olá, Dra. Rafaela. Quero analisar o cancelamento de um contrato de multipropriedade.'

export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_DEFAULT_MESSAGE,
)}`

// Mensagem e link padrão para usucapião e regularização imobiliária (rota "/usucapiao")
export const WHATSAPP_USUCAPIAO_MESSAGE =
  'Olá, Dra. Rafaela. Quero analisar um caso de usucapião e regularização de imóveis.'

export const WHATSAPP_USUCAPIAO_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_USUCAPIAO_MESSAGE,
)}`

export function getWhatsAppLink(message?: string): string {
  const text = message ?? WHATSAPP_DEFAULT_MESSAGE
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}
