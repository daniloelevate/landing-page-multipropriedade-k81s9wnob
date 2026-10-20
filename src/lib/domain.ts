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

/**
 * Detecta se o ambiente atual é preview da Skip (*.goskip.app, *.goskip.dev) ou ambiente local/dev.
 * No Skip preview e localhost, o comportamento é sempre o padrão SPA:
 * - "/" renderiza Multipropriedade (Index)
 * - "/usucapiao" renderiza Usucapião
 */
export function isSkipOrDevHost(hostname?: string): boolean {
  if (typeof window === 'undefined' && !hostname) return false
  const host = (
    hostname || (typeof window !== 'undefined' ? window.location.hostname : '')
  ).toLowerCase()

  // 1. Qualquer host do ecossistema Skip (goskip.app, goskip.dev, skip.it, goskip.cloud, etc.)
  if (host.includes('skip') || host.includes('goskip')) {
    return true
  }

  // 2. Ambientes de desenvolvimento local e preview
  if (
    host.includes('localhost') ||
    host === '127.0.0.1' ||
    host.endsWith('.local') ||
    host.includes('preview') ||
    host.includes('internal') ||
    host.includes('webcontainer') ||
    host.includes('stackblitz') ||
    host.includes('lovable') ||
    host.includes('railway') ||
    host === ''
  ) {
    return true
  }

  // 3. Iframe de visualização (o preview da plataforma roda em iframe)
  // Se estiver dentro de um iframe e não for estritamente o domínio próprio configurado
  if (typeof window !== 'undefined' && window.self !== window.top) {
    if (!host.endsWith('saesadvogada.com.br')) {
      return true
    }
  }

  return false
}

/**
 * Retorna true APENAS em produção para o subdomínio usucapiao (ex: usucapiao.saesadvogada.com.br).
 * No preview da Skip, localhost e em multipropriedade/saesadvogada.com.br, SEMPRE retorna false.
 */
export function isUsucapiaoHost(): boolean {
  if (typeof window === 'undefined') return false
  if (isSkipOrDevHost()) return false

  const host = window.location.hostname.toLowerCase()

  // Em nenhum cenário a raiz de multipropriedade ou do domínio raiz deve ser Usucapião
  if (
    host === 'saesadvogada.com.br' ||
    host === 'www.saesadvogada.com.br' ||
    host.startsWith('multipropriedade.')
  ) {
    return false
  }

  // Apenas a raiz do host usucapiao.* em produção
  return host.startsWith('usucapiao.')
}

/**
 * Retorna true APENAS em produção para o subdomínio multipropriedade (ex: multipropriedade.saesadvogada.com.br).
 * No preview da Skip e localhost, sempre retorna false.
 */
export function isMultipropriedadeHost(): boolean {
  if (typeof window === 'undefined') return false
  if (isSkipOrDevHost()) return false
  const host = window.location.hostname.toLowerCase()
  return host.startsWith('multipropriedade.')
}

/**
 * Retorna true apenas para domínios próprios em produção (saesadvogada.com.br).
 */
export function isCustomDomain(): boolean {
  if (typeof window === 'undefined') return false
  if (isSkipOrDevHost()) return false
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
 * conforme a página ativa (isUsucapiao: boolean).
 */
export function syncDocumentMeta(isUsucapiao: boolean): void {
  if (typeof document === 'undefined') return

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

/**
 * Atualiza dinamicamente o título do documento e as tags meta de descrição
 * com base no subdomínio/host acessado na inicialização.
 */
export function syncDocumentMetaForHost(): void {
  syncDocumentMeta(isUsucapiaoHost())
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
