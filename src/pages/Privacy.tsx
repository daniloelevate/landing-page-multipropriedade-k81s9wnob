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
            dados compartilhados por meio de mensagens via WhatsApp e canais de atendimento desta
            página.
          </p>
          <h2>Dados coletados</h2>
          <p>
            Podemos receber nome, telefone/WhatsApp e informações voluntariamente encaminhadas em
            mensagem ou anexos, como cópia do contrato, identificação do empreendimento,
            comprovantes de pagamento, situação atual do caso e eventuais propostas de distrato.
          </p>
          <h2>Finalidade do tratamento</h2>
          <p>
            Os dados são utilizados exclusivamente para realizar a análise inicial do caso,
            responder às mensagens do titular, prestar orientações preliminares e viabilizar o
            atendimento jurídico solicitado.
          </p>
          <h2>Compartilhamento e segurança</h2>
          <p>
            As informações são acessadas apenas para as finalidades do atendimento e não são
            comercializadas. São adotadas medidas técnicas e organizacionais razoáveis para proteger
            seus dados, resguardados pelo sigilo profissional inerente à advocacia.
          </p>
          <h2>Direitos previstos na LGPD</h2>
          <p>
            O titular pode solicitar confirmação do tratamento, acesso, correção, atualização,
            anonimização, bloqueio, eliminação ou informações sobre o uso dos seus dados, nos termos
            da Lei nº 13.709/2018.
          </p>
          <h2>Responsável pelo tratamento</h2>
          <p>
            Rafaela Saes — Saes Advocacia. Solicitações relacionadas à privacidade e proteção de
            dados podem ser encaminhadas diretamente pelo WhatsApp ou pelos canais de contato do
            escritório.
          </p>
          <p className="border-l-2 border-gold pl-5 text-[#3b362d]">
            O envio de mensagem pelo WhatsApp não formaliza, por si só, a contratação de serviços
            jurídicos. Honorários, etapas e termos de atuação são explicados de forma transparente
            antes de qualquer contratação.
          </p>
        </div>
      </div>
    </div>
  )
}
