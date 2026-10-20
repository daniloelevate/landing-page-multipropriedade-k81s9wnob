/**
 * Utilitários para detecção de subdomínio e geração de links cruzados entre as landing pages.
 *
 * Em produção (saesadvogada.com.br):
 * - usucapiao.saesadvogada.com.br -> abre diretamente a página de Usucapião na raiz "/"
 * - multipropriedade.saesadvogada.com.br -> abre a página de Multipropriedade na raiz "/"
 * - Links entre as duas páginas utilizam URLs absolutas https://...
 *
 * Em localhost / *.goskip.app / desenvolvimento:
 * - "/" sempre abre Multipropriedade e "/usucapiao" abre Usucapião.
 * - Links cruzados utilizam rotas internas do React Router ("/" e "/usucapiao").
 */

export function isUsucapiaoHost(): boolean {
  if (typeof window === 'undefined') return false
  const host = window.location.hostname.toLowerCase()
  return host.startsWith('usucapiao.')
}

export function isMultipropriedadeHost(): boolean {
  if (typeof window === 'undefined') return false
  const host = window.location.hostname.toLowerCase()
  return host.startsWith('multipropriedade.')
}

export function isCustomDomain(): boolean {
  if (typeof window === 'undefined') return false
  const host = window.location.hostname.toLowerCase()
  return host.includes('saesadvogada.com.br')
}

export const MULTIPROPRIEDADE_META = {
  title: 'Saes Advocacia — Cancelamento de Contratos de Multipropriedade',
  description:
    'Análise de contrato de multipropriedade para avaliar cancelamento, negociação de distrato e questionamento de cobranças, nas vias extrajudicial e judicial. Atendimento online com a Dra. Rafaela Saes — OAB/SP 485.223.',
}

export const USUCAPIAO_META = {
  title: 'Saes Advocacia — Usucapião e Regularização Imobiliária',
  description:
    'Análise de posse e documentação imobiliária para regularização de imóveis e usucapião extrajudicial ou judicial. Atendimento online com a Dra. Rafaela Saes — OAB/SP 485.223.',
}

/**
 * Atualiza dinamicamente o título do documento e as tags meta de descrição
 * com base no subdomínio/host acessado.
 */
export function syncDocumentMetaForHost(): void {
  if (typeof document === 'undefined') return

  const isUsucapiao = isUsucapiaoHost()
  const meta = isUsucapiao ? USUCAPIAO_META : MULTIPROPRIEDADE_META

  document.title = meta.title

  // Atualiza meta description
  const descEl = document.querySelector('meta[name="description"]')
  if (descEl) {
    descEl.setAttribute('content', meta.description)
  }

  // Atualiza Open Graph meta tags
  const ogTitleEl = document.querySelector('meta[property="og:title"]')
  if (ogTitleEl) {
    ogTitleEl.setAttribute('content', meta.title)
  }

  const ogDescEl = document.querySelector('meta[property="og:description"]')
  if (ogDescEl) {
    ogDescEl.setAttribute('content', meta.description)
  }
}

export interface NavDestination {
  href: string
  isExternal: boolean
}

/**
 * Retorna o destino correto para o link de "Multipropriedade"
 */
export function getMultipropriedadeNav(): NavDestination {
  if (isCustomDomain()) {
    return {
      href: 'https://multipropriedade.saesadvogada.com.br/',
      isExternal: true,
    }
  }
  return {
    href: '/',
    isExternal: false,
  }
}

/**
 * Retorna o destino correto para o link de "Usucapião"
 */
export function getUsucapiaoNav(): NavDestination {
  if (isCustomDomain()) {
    return {
      href: 'https://usucapiao.saesadvogada.com.br/',
      isExternal: true,
    }
  }
  return {
    href: '/usucapiao',
    isExternal: false,
  }
}
