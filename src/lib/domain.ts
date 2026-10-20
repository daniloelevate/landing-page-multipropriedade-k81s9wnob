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
