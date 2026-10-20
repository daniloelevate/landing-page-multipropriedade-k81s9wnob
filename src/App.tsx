/* Main App Component - Handles routing (using react-router-dom), query client and other providers - use this file to add all routes */
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Index from './pages/Index'
import Usucapiao from './pages/Usucapiao'
import NotFound from './pages/NotFound'
import Privacy from './pages/Privacy'
import Layout from './components/Layout'
import { isUsucapiaoHost, syncDocumentMetaForHost } from './lib/domain'

// ONLY IMPORT AND RENDER WORKING PAGES, NEVER ADD PLACEHOLDER COMPONENTS OR PAGES IN THIS FILE
// AVOID REMOVING ANY CONTEXT PROVIDERS FROM THIS FILE (e.g. TooltipProvider, Toaster, Sonner)

const App = () => {
  const isUsucapiaoDomain = isUsucapiaoHost()

  useEffect(() => {
    syncDocumentMetaForHost()

    // Observer para remover qualquer elemento ou selo "Criado com Skip" que possa ser injetado dinamicamente
    const removeSkipBadge = () => {
      const candidates = document.querySelectorAll<HTMLElement>(
        '[data-skip-badge], [data-skip-watermark], [class*="skip-badge"], [id*="skip-badge"], a[href*="goskip"], a[href*="skip.it"]',
      )
      candidates.forEach((el) => {
        el.style.setProperty('display', 'none', 'important')
        el.style.setProperty('opacity', '0', 'important')
        el.style.setProperty('visibility', 'hidden', 'important')
      })

      // Procura elementos com texto "Criado com Skip" ou "Made with Skip"
      const allElements = document.querySelectorAll<HTMLElement>('body *')
      allElements.forEach((el) => {
        if (el.children.length === 0 && el.textContent) {
          const text = el.textContent.trim().toLowerCase()
          if (
            (text.includes('criado com skip') || text.includes('made with skip')) &&
            !el.closest('main') &&
            !el.closest('p')
          ) {
            const container = el.closest('a') || el.closest('div') || el
            container.style.setProperty('display', 'none', 'important')
          }
        }
      })
    }

    removeSkipBadge()
    const observer = new MutationObserver(removeSkipBadge)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  return (
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route element={<Layout />}>
            {/* Se o hostname for especificamente de usucapião em produção (ex: usucapiao.saesadvogada.com.br),
                a raiz "/" renderiza diretamente a página de Usucapião.
                Em localhost, no preview da Skip (*.goskip.app / *.goskip.dev) e em multipropriedade.saesadvogada.com.br,
                a raiz "/" SEMPRE renderiza a página de Multipropriedade (Index). */}
            <Route path="/" element={isUsucapiaoDomain ? <Usucapiao /> : <Index />} />
            <Route path="/usucapiao" element={<Usucapiao />} />
            <Route path="/privacidade" element={<Privacy />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  )
}

export default App
