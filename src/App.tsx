/* Main App Component - Handles routing (using react-router-dom), query client and other providers - use this file to add all routes */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Index from './pages/Index'
import Usucapiao from './pages/Usucapiao'
import NotFound from './pages/NotFound'
import Privacy from './pages/Privacy'
import Layout from './components/Layout'
import { isUsucapiaoHost } from './lib/domain'

// ONLY IMPORT AND RENDER WORKING PAGES, NEVER ADD PLACEHOLDER COMPONENTS OR PAGES IN THIS FILE
// AVOID REMOVING ANY CONTEXT PROVIDERS FROM THIS FILE (e.g. TooltipProvider, Toaster, Sonner)

const App = () => {
  const isUsucapiaoDomain = isUsucapiaoHost()

  return (
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route element={<Layout />}>
            {/* Se o hostname começar com "usucapiao" (ex: usucapiao.saesadvogada.com.br),
                a raiz "/" renderiza diretamente a página de Usucapião.
                Caso contrário, "/" renderiza a página de Multipropriedade. */}
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
