import { CheckCircle2, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ThankYou() {
  const message = encodeURIComponent(
    'Olá, Dra. Rafaela. Quero analisar o cancelamento de um contrato de multipropriedade.',
  )
  return (
    <div className="page-simple flex min-h-[78vh] items-center px-6 py-32">
      <div className="mx-auto max-w-2xl text-center">
        <CheckCircle2 className="mx-auto mb-6 text-success" size={54} />
        <p className="eyebrow">INFORMAÇÕES RECEBIDAS</p>
        <h1 className="section-title">Obrigada pelo seu contato.</h1>
        <p className="mt-6 text-lg text-[#3b362d]">
          Recebemos suas informações. Continue no WhatsApp para falar com o escritório.
        </p>
        <a
          href={`https://wa.me/5511977179072?text=${message}`}
          target="_blank"
          rel="noreferrer"
          className="btn-primary mt-8 inline-flex"
        >
          <MessageCircle size={19} /> Continuar no WhatsApp
        </a>
        <p className="mt-8 border-t border-line pt-7 text-sm text-[#3b362d]">
          A análise é individual e depende do contrato e dos documentos apresentados. Não há
          garantia de resultado.
        </p>
        <Link to="/" className="mt-6 inline-block text-sm font-semibold text-gold underline">
          Voltar ao início
        </Link>
      </div>
    </div>
  )
}
