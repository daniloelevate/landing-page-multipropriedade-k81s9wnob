import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Scale,
  Check,
  CircleDollarSign,
  FileCheck2,
  Handshake,
  Megaphone,
  MessageCircle,
  ReceiptText,
  ShieldCheck,
  FileText,
  Clock,
  Lock,
} from 'lucide-react'
import heroPhoto from '@/assets/whatsapp-image-2026-10-14-at-15.03.19-4b0c3.jpeg'
import aboutPhoto from '@/assets/foto-rafaela-saes-2-9c8cf.jpeg'
import { WHATSAPP_LINK } from '@/constants/contact'

const situations = [
  'Comprou uma cota em um empreendimento turístico ou hoteleiro e se arrependeu.',
  'Foi convencido a contratar durante uma apresentação comercial ou abordagem em evento.',
  'As condições apresentadas na venda não correspondem ao contrato.',
  'Não consegue utilizar a unidade ou não encontra disponibilidade nas datas desejadas.',
  'Está pagando parcelas, taxa de manutenção ou outras cobranças e quer cancelar.',
  'Recebeu uma proposta de distrato com retenção que deseja compreender.',
  'Tentou cancelar administrativamente, mas a empresa não resolveu.',
]

const cards = [
  [
    'Cancelamento do contrato',
    'Avaliação da possibilidade de encerramento da contratação.',
    FileCheck2,
  ],
  [
    'Devolução de valores',
    'Análise dos pagamentos, retenções e condições propostas pela empresa.',
    CircleDollarSign,
  ],
  [
    'Cobranças e taxas',
    'Verificação de parcelas, manutenção, condomínio, intercâmbio e outras despesas.',
    ReceiptText,
  ],
  [
    'Venda e publicidade',
    'Comparação entre a oferta, a apresentação comercial e o contrato assinado.',
    Megaphone,
  ],
  [
    'Negociação extrajudicial',
    'Notificação, contato formal e tentativa de acordo com a empresa.',
    Handshake,
  ],
  [
    'Medida judicial',
    'Avaliação da necessidade de ação após análise de viabilidade e riscos.',
    Scale,
  ],
] as const

const timeline = [
  'recebimento do contrato, comprovantes e comunicações',
  'identificação das partes, empreendimento, valores e obrigações',
  'análise das cláusulas de cancelamento e das penalidades',
  'avaliação das condições de contratação e da documentação disponível',
  'definição da estratégia e dos riscos do caso',
  'elaboração de notificação ou requerimento formal',
  'negociação com a empresa, quando houver margem para composição',
  'análise da proposta de acordo',
  'formalização do distrato e acompanhamento das obrigações assumidas',
  'avaliação de medida judicial se a negociação fracassar',
]

const benefits = [
  'tentativa de solução sem iniciar imediatamente um processo',
  'formalização adequada do pedido de cancelamento',
  'compreensão dos valores envolvidos antes de aceitar uma proposta',
  'redução do risco de assinar um distrato desfavorável sem orientação',
  'registro das tratativas e dos documentos relevantes',
]

const faqs = [
  [
    'Posso cancelar qualquer contrato de multipropriedade?',
    'A possibilidade depende do contrato, da forma de contratação, dos pagamentos realizados, das circunstâncias da venda, da situação do empreendimento e de outros documentos. É necessária análise individual.',
  ],
  [
    'Preciso continuar pagando?',
    'Essa orientação não deve ser dada de forma genérica. A suspensão de pagamentos pode gerar consequências contratuais e deve ser avaliada conforme o caso concreto.',
  ],
  [
    'A empresa pode reter parte do que paguei?',
    'A retenção depende do contrato, da legislação aplicável, das circunstâncias da contratação e da forma de encerramento. Uma proposta de distrato deve ser analisada antes da assinatura.',
  ],
  [
    'É possível resolver sem processo?',
    'Pode ser possível tentar uma negociação extrajudicial por meio de requerimento ou notificação formal. O resultado depende da documentação, da posição da empresa e das condições do caso.',
  ],
  [
    'Já assinei uma proposta de distrato. Ainda posso pedir análise?',
    'Sim. A proposta deve ser examinada antes da assinatura ou, se já assinada, deve ser analisada junto com o contrato original e as comunicações realizadas.',
  ],
  [
    'Quais documentos devo enviar?',
    'Contrato, aditivos, comprovantes de pagamento, boletos, proposta comercial, conversas, e-mails, notificações e proposta de distrato, se houver.',
  ],
]

export default function Index() {
  return (
    <>
      <section className="hero">
        <div className="container-wide hero-grid">
          <div className="hero-copy animate-fade-in-up">
            <p className="eyebrow">CANCELAMENTO DE CONTRATOS DE MULTIPROPRIEDADE</p>
            <h1>Quer cancelar seu contrato de multipropriedade?</h1>
            <p className="hero-subtitle">
              Analise seu contrato e entenda quais caminhos podem ser avaliados para negociar o
              cancelamento, questionar cobranças e buscar uma solução extrajudicial ou judicial.
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-7 inline-flex"
            >
              <MessageCircle size={18} /> Enviar contrato para análise inicial
            </a>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#3b362d]">
              Atendimento direcionado a contratos de multipropriedade, cotas imobiliárias e produtos
              de férias compartilhadas. Não atuamos com distrato de locação ou rescisão de contrato
              de aluguel.
            </p>
          </div>
          <div className="hero-photo-wrap">
            <div className="hero-frame" />
            <img src={heroPhoto} alt="Dra. Rafaela Saes" className="hero-photo" />
          </div>
        </div>
        <div className="scroll-line" />
      </section>

      <section className="section">
        <div className="container-wide">
          <h2 className="section-title">Você se identificou em alguma destas situações?</h2>
          <div className="check-grid mt-12">
            {situations.map((s, i) => (
              <div key={s} className="check-item" style={{ animationDelay: `${i * 60}ms` }}>
                <span>
                  <Check size={16} />
                </span>
                <p>{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="analise" className="section bg-sand scroll-mt-24">
        <div className="container-wide">
          <p className="eyebrow">AVALIAÇÃO JURÍDICA INDIVIDUAL</p>
          <h2 className="section-title">O que pode ser analisado</h2>
          <div className="cards-grid mt-12">
            {cards.map(([title, text, Icon], i) => (
              <article
                key={title}
                className="service-card"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <Icon className="text-gold" strokeWidth={1.5} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 border-l-2 border-gold pl-5 text-[#3b362d]">
            Todas as possibilidades dependem da análise do contrato e dos documentos do seu caso.
          </p>
        </div>
      </section>

      <section id="como-funciona" className="section scroll-mt-24">
        <div className="container-wide">
          <p className="eyebrow">ATUAÇÃO ESTRUTURADA</p>
          <h2 className="section-title">Análise e negociação de distrato</h2>
          <p className="mt-6 max-w-3xl text-lg text-[#3b362d]">
            A atuação extrajudicial é uma etapa real e estruturada, definida após o estudo das
            circunstâncias e da documentação de cada contratação.
          </p>
          <div className="mt-14 grid gap-16 lg:grid-cols-[1.35fr_.8fr]">
            <div>
              <h3 className="subheading">Etapas possíveis</h3>
              <ol className="timeline">
                {timeline.map((t, i) => (
                  <li key={t}>
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    <p>{t}</p>
                  </li>
                ))}
              </ol>
            </div>
            <aside className="benefits">
              <ShieldCheck size={35} />
              <h3 className="subheading">Benefícios</h3>
              <p className="text-sm text-darkmuted">A análise e a negociação podem permitir:</p>
              <ul>
                {benefits.map((b) => (
                  <li key={b}>
                    <Check size={16} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-darkmuted">
                Essas medidas podem evitar decisões sem a compreensão integral das condições. O
                resultado depende do caso.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section id="sobre" className="section bg-black text-cream scroll-mt-24">
        <div className="container-wide grid items-center gap-14 lg:grid-cols-[.8fr_1.1fr]">
          <div className="about-photo-wrap">
            <img src={aboutPhoto} alt="Dra. Rafaela Saes sentada com um livro" />
          </div>
          <div>
            <p className="eyebrow">SOBRE A DRA. RAFAELA</p>
            <h2 className="section-title text-cream">Direito Imobiliário com análise individual</h2>
            <p className="mt-7 text-xl leading-relaxed text-darkmuted">
              Atuação focada na análise e condução de casos envolvendo cancelamento de contratos de
              multipropriedade, com avaliação individual da documentação e definição da estratégia
              adequada para cada situação.
            </p>
            <ul className="authority-list">
              <li>Rafaela Saes — Advogada. OAB/SP 485.223</li>
              <li>Atendimento online em todo o Brasil.</li>
              <li>Cada contrato e conjunto de documentos recebe análise individual.</li>
              <li>A atuação jurídica não envolve garantia de resultado.</li>
              <li>Honorários e etapas são explicados antes da contratação.</li>
            </ul>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-8 inline-flex"
            >
              <MessageCircle size={18} /> Enviar contrato para análise
            </a>
          </div>
        </div>
      </section>

      <section id="formulario" className="section scroll-mt-20">
        <div className="container-wide">
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow">ANÁLISE INDIVIDUAL E DIRETA</p>
            <h2 className="section-title">Envie seu contrato para análise</h2>
            <p className="mt-5 text-lg text-[#3b362d]">
              Fale diretamente com o escritório pelo WhatsApp. A avaliação do seu caso é feita de
              forma individual, sem intermediários e sem garantia de resultado.
            </p>
          </div>

          <div className="whatsapp-cta-box">
            <div className="whatsapp-cta-content">
              <div className="whatsapp-badge">
                <MessageCircle size={20} className="text-gold" />
                <span>Atendimento direto pelo WhatsApp</span>
              </div>
              <h3 className="whatsapp-cta-title">
                Como funciona o contato inicial com o escritório
              </h3>
              <p className="whatsapp-cta-description">
                Ao clicar no botão abaixo, você será direcionado para o WhatsApp do escritório com
                uma mensagem já pronta para iniciar a conversa. Você poderá encaminhar o contrato em
                PDF ou foto, relatar as circunstâncias da compra e esclarecer os pontos principais
                para uma análise técnica preliminar.
              </p>

              <div className="whatsapp-features">
                <div className="whatsapp-feature-item">
                  <span className="feature-icon-wrap">
                    <Clock size={18} />
                  </span>
                  <div>
                    <strong>Sem formulários longos</strong>
                    <p>Início imediato da conversa diretamente no aplicativo que você já usa.</p>
                  </div>
                </div>
                <div className="whatsapp-feature-item">
                  <span className="feature-icon-wrap">
                    <FileText size={18} />
                  </span>
                  <div>
                    <strong>Envio seguro de documentos</strong>
                    <p>
                      Encaminhe o contrato, proposta ou termo de distrato para exame individual.
                    </p>
                  </div>
                </div>
                <div className="whatsapp-feature-item">
                  <span className="feature-icon-wrap">
                    <Lock size={18} />
                  </span>
                  <div>
                    <strong>Sigilo profissional e LGPD</strong>
                    <p>
                      Suas informações são tratadas sob sigilo ético e estrita confidencialidade.
                    </p>
                  </div>
                </div>
              </div>

              <div className="whatsapp-action-area">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary whatsapp-main-button"
                >
                  <MessageCircle size={20} />
                  <span>Enviar contrato para análise inicial</span>
                </a>
                <p className="whatsapp-disclaimer">
                  A mensagem padrão iniciará a conversa: &ldquo;Olá, Dra. Rafaela. Quero analisar o
                  cancelamento de um contrato de multipropriedade.&rdquo;
                </p>
              </div>

              <div className="whatsapp-notice">
                <p>
                  A análise inicial é individual e preliminar, dependendo dos documentos
                  apresentados. A atuação jurídica não envolve promessa ou garantia de resultado.
                  Honorários e eventuais etapas são detalhados de forma transparente antes de
                  qualquer contratação formal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="segment-strip">
        <div className="container-wide">
          Esta página é exclusiva para contratos de multipropriedade, cotas imobiliárias, unidades
          hoteleiras e produtos de férias compartilhadas. Não atendemos distrato de aluguel,
          rescisão de locação, despejo, cobrança de aluguel ou conflitos entre locador e inquilino.
        </div>
      </div>

      <section id="faq" className="section bg-sand scroll-mt-24">
        <div className="container-wide max-w-4xl">
          <p className="eyebrow">INFORMAÇÕES IMPORTANTES</p>
          <h2 className="section-title">Dúvidas frequentes</h2>
          <Accordion type="single" collapsible className="mt-12 border-t border-line">
            {faqs.map(([q, a], i) => (
              <AccordionItem key={q} value={`item-${i}`} className="border-line">
                <AccordionTrigger className="py-6 text-left font-display text-xl hover:no-underline">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-[#3b362d] [&>div]:text-[#3b362d]">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-10 inline-flex"
          >
            <MessageCircle size={18} /> Enviar contrato para análise inicial
          </a>
        </div>
      </section>
    </>
  )
}
