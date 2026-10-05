import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Privacy() {
  return (
    <div className="page-simple">
      <div className="mx-auto max-w-3xl px-6 py-32">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold"
        >
          <ArrowLeft size={17} /> Voltar ao início
        </Link>
        <p className="eyebrow">PRIVACIDADE E PROTEÇÃO DE DADOS</p>
        <h1 className="section-title">Política de Privacidade</h1>
        <div className="prose-law mt-10">
          <p>
            Esta Política de Privacidade explica como a Saes Advocacia coleta, utiliza e protege os
            dados enviados por meio do formulário desta página.
          </p>
          <h2>Dados coletados</h2>
          <p>
            Podemos coletar nome, e-mail, telefone/WhatsApp e informações relacionadas ao contrato,
            empreendimento, pagamentos, situação atual e documentos disponíveis.
          </p>
          <h2>Finalidade do tratamento</h2>
          <p>
            Os dados são utilizados para realizar a triagem inicial, analisar as informações do
            caso, entrar em contato com o titular e organizar o atendimento jurídico solicitado.
          </p>
          <h2>Compartilhamento e segurança</h2>
          <p>
            As informações são acessadas apenas para as finalidades do atendimento e não são
            comercializadas. São adotadas medidas razoáveis para prevenir acessos não autorizados,
            perda ou uso inadequado.
          </p>
          <h2>Direitos previstos na LGPD</h2>
          <p>
            O titular pode solicitar confirmação do tratamento, acesso, correção, atualização,
            anonimização, bloqueio, eliminação ou informações sobre o uso dos seus dados, nos termos
            da Lei nº 13.709/2018.
          </p>
          <h2>Responsável pelo tratamento</h2>
          <p>
            Rafaela Saes — Saes Advocacia. Solicitações relacionadas à privacidade podem ser
            encaminhadas pelo canal de contato do escritório.
          </p>
          <p className="border-l-2 border-gold pl-5 text-[#3b362d]">
            O envio do formulário não formaliza contratação de serviços jurídicos. Honorários e
            etapas são explicados antes da contratação.
          </p>
        </div>
      </div>
    </div>
  )
}
