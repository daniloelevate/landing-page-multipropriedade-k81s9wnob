import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Menu, MessageCircle, X } from 'lucide-react'
import logo from '@/assets/logotipo-rafaela-saes-03c8d.jpeg'
import { getMultipropriedadeNav, getUsucapiaoNav, isUsucapiaoHost } from '@/lib/domain'
import { WHATSAPP_LINK, WHATSAPP_USUCAPIAO_LINK } from '@/constants/contact'
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton'

const defaultLinks = [
  ['O que pode ser analisado', 'analise'],
  ['Como funciona', 'como-funciona'],
  ['Sobre a Dra. Rafaela', 'sobre'],
  ['Dúvidas frequentes', 'faq'],
]

const usucapiaoLinks = [
  ['Situações', 'situacoes'],
  ['O que analisamos', 'analise'],
  ['Como funciona', 'como-funciona'],
  ['Sobre a Dra. Rafaela', 'sobre'],
  ['Dúvidas frequentes', 'faq'],
]

export default function Layout() {
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const isUsucapiaoHostDomain = isUsucapiaoHost()
  const isUsucapiao =
    location.pathname.startsWith('/usucapiao') ||
    (isUsucapiaoHostDomain && location.pathname === '/')
  const isHome = location.pathname === '/' && !isUsucapiaoHostDomain
  const currentLinks = isUsucapiao ? usucapiaoLinks : defaultLinks
  const currentWhatsAppLink = isUsucapiao ? WHATSAPP_USUCAPIAO_LINK : WHATSAPP_LINK
  const currentCtaLabel = isUsucapiao
    ? 'Enviar documentos para análise'
    : 'Enviar contrato para análise'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenu(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  const multiNav = getMultipropriedadeNav()
  const usucapiaoNav = getUsucapiaoNav()

  const go = (id: string) => {
    setMenu(false)
    // Se estiver no host usucapiao e na rota "/", a página atual já é usucapião
    const targetPath = isUsucapiaoHostDomain ? '/' : isUsucapiao ? '/usucapiao' : '/'
    if (location.pathname !== targetPath) {
      navigate(`${targetPath}#${id}`)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header
        className={`site-header ${
          scrolled || (location.pathname !== '/' && location.pathname !== '/usucapiao')
            ? 'header-solid'
            : ''
        }`}
      >
        <div className="container-wide flex h-20 items-center justify-between">
          <Link
            to={isUsucapiaoHostDomain ? '/' : isUsucapiao ? '/usucapiao' : '/'}
            className="brand"
            aria-label="Saes Advocacia - início"
          >
            <img src={logo} alt="Monograma SR" />
            <span>SAES ADVOCACIA</span>
          </Link>
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegação principal">
            {currentLinks.map(([label, id]) => (
              <button key={id} onClick={() => go(id)} className="nav-link">
                {label}
              </button>
            ))}
            <a
              href={currentWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline py-3"
            >
              {currentCtaLabel}
            </a>
          </nav>
          <button onClick={() => setMenu(true)} className="p-2 lg:hidden" aria-label="Abrir menu">
            <Menu />
          </button>
        </div>
      </header>

      {menu && (
        <div className="mobile-menu">
          <button
            onClick={() => setMenu(false)}
            className="absolute right-6 top-6 p-3 text-cream"
            aria-label="Fechar menu"
          >
            <X size={30} />
          </button>
          <img src={logo} alt="Saes Advocacia" className="mb-10 h-24 w-24 object-contain" />
          {currentLinks.map(([label, id], i) => (
            <button
              key={id}
              onClick={() => go(id)}
              style={{ animationDelay: `${i * 70}ms` }}
              className="animate-fade-in-up font-display text-3xl text-cream"
            >
              {label}
            </button>
          ))}
          <a
            href={currentWhatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenu(false)}
            className="btn-primary mt-5 inline-flex"
          >
            <MessageCircle size={18} /> {currentCtaLabel}
          </a>
        </div>
      )}

      <main>
        <Outlet />
      </main>

      <footer className="bg-black pb-28 pt-16 text-cream sm:pb-10">
        <div className="container-wide grid gap-10 md:grid-cols-[1fr_1.6fr]">
          <div>
            <img src={logo} alt="Saes Advocacia" className="h-28 w-28 rounded object-contain" />
            <p className="wordmark mt-4">SAES ADVOCACIA</p>
            <p className="mt-2 text-xs uppercase tracking-widest text-gold">
              Direito Imobiliário & Regularização
            </p>
          </div>
          <div className="space-y-4 text-sm text-darkmuted">
            <p className="text-base text-cream">Rafaela Saes — Advogada. OAB/SP 485.223</p>
            <p>Responsável pelo tratamento dos dados: Rafaela Saes — Saes Advocacia.</p>

            {/* Navegação entre as áreas de atuação / landing pages */}
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                Áreas de Atuação do Escritório
              </p>
              <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {multiNav.isExternal ? (
                  <a
                    href={multiNav.href}
                    className={`transition-colors hover:text-gold ${
                      isHome ? 'font-medium text-cream' : 'text-darkmuted'
                    }`}
                  >
                    Cancelamento de multipropriedade
                  </a>
                ) : (
                  <Link
                    to={multiNav.href}
                    className={`transition-colors hover:text-gold ${
                      isHome ? 'font-medium text-cream' : 'text-darkmuted'
                    }`}
                  >
                    Cancelamento de multipropriedade
                  </Link>
                )}
                <span className="text-white/20">•</span>
                {usucapiaoNav.isExternal ? (
                  <a
                    href={usucapiaoNav.href}
                    className={`transition-colors hover:text-gold ${
                      isUsucapiao ? 'font-medium text-cream' : 'text-darkmuted'
                    }`}
                  >
                    Usucapião e regularização de imóveis
                  </a>
                ) : (
                  <Link
                    to={usucapiaoNav.href}
                    className={`transition-colors hover:text-gold ${
                      isUsucapiao ? 'font-medium text-cream' : 'text-darkmuted'
                    }`}
                  >
                    Usucapião e regularização de imóveis
                  </Link>
                )}
              </div>
            </div>

            <div>
              <Link
                to="/privacidade"
                className="inline-block text-gold underline underline-offset-4"
              >
                Política de Privacidade
              </Link>
            </div>
            <p>
              A análise é individual e não há garantia de resultado. Honorários e etapas são
              explicados antes da contratação.
            </p>
            <p className="text-xs text-darkmuted/80">
              {isUsucapiao
                ? 'Atendimento direcionado a usucapião, regularização de imóveis e questões de propriedade. Não atendemos distrato de aluguel, rescisão de locação, despejo ou cobrança de aluguel.'
                : 'Atendimento exclusivo para multipropriedade, cotas imobiliárias, unidades hoteleiras e produtos de férias compartilhadas. Não atendemos conflitos de locação.'}
            </p>
            <div className="border-t border-white/10 pt-5">
              © 2026 Saes Advocacia — Todos os direitos reservados
            </div>
          </div>
        </div>
      </footer>

      {/* Botão flutuante único de WhatsApp com balão "Precisa de ajuda?" e logotipo SVG inline */}
      {(isHome || isUsucapiao) && (
        <WhatsAppFloatingButton href={currentWhatsAppLink} label="Precisa de ajuda?" />
      )}
    </div>
  )
}
