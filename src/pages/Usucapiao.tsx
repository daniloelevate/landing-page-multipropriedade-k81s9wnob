import { useEffect } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Building2,
  Check,
  Clock,
  Compass,
  FileCheck2,
  FileSearch,
  FileSpreadsheet,
  FileText,
  Lock,
  MessageCircle,
  Scale,
  ShieldCheck,
} from 'lucide-react'
import heroPhoto from '@/assets/whatsapp-image-2026-10-14-at-15.03.38-92ce2.jpeg'
import aboutPhoto from '@/assets/whatsapp-image-2026-10-14-at-15.03.19-4b0c3.jpeg'
import { WHATSAPP_USUCAPIAO_LINK } from '@/constants/contact'

const situations = [
  'Mora há anos em um imóvel que está no nome de outra pessoa ou de quem não se tem notícia.',
  'Comprou um imóvel por contrato particular e nunca registrou a escritura.',
  'Herdou ou ocupa um imóvel sem documentação formal de propriedade.',
  'Possui um lote ou terreno sem registro ou com documentação incompleta.',
  'Recebeu uma intimação, cobrança ou ação envolvendo um imóvel que ocupa há muitos anos.',
  'Quer vender ou financiar o imóvel, mas não consegue por falta de registro em nome próprio.',
]

const cards = [
  [
    'Usucapião extrajudicial',
    'Análise da viabilidade do reconhecimento direto em cartório, com ata notarial e documentação.',
    Building2,
  ],
  [
    'Usucapião judicial',
    'Avaliação da ação judicial quando o caminho cartorário não for adequado.',
    Scale,
  ],
  [
    'Documentação do imóvel',
    'Verificação de contratos, escrituras, registros, contas e provas da posse.',
    FileSearch,
  ],
  [
    'Tempo de posse',
    'Análise do período de ocupação, da forma como ela ocorreu e dos requisitos legais.',
    Clock,
  ],
  [
    'Regularização do registro',
    'Orientação sobre etapas cartorárias, certidões e providências junto ao registro de imóveis.',
    FileSpreadsheet,
  ],
  [
    'Conflitos de posse e propriedade',
    'Análise de situações com terceiros, herdeiros ou ex-proprietários, conforme o caso.',
    Compass,
  ],
] as const

const timeline = [
  'recebimento dos documentos, fotos e relato da ocupação;',
  'identificação do imóvel, das pessoas envolvidas e da situação registral;',
  'análise da documentação disponível e das provas da posse;',
  'verificação do tempo de posse e dos requisitos legais de cada modalidade;',
  'definição da estratégia: via extrajudicial, judicial ou complementar;',
  'levantamento de certidões e documentos junto a cartórios e órgãos públicos;',
  'elaboração da ata notarial, justificativas e documentos necessários;',
  'protocolo do pedido no cartório ou da ação na justiça;',
  'acompanhamento da publicação, eventuais impugnações e diligências;',
  'conclusão com o registro da propriedade em nome do cliente, quando reconhecido o direito.',
]

const benefits = [
  'possibilidade de reconhecer a propriedade de quem mora no imóvel há anos;',
  'organização da documentação de forma adequada;',
  'compreensão dos requisitos e das etapas antes de iniciar;',
  'registro da propriedade, quando reconhecido, que pode facilitar venda, financiamento e inventário futuro.',
]

const faqs = [
  [
    'Qualquer imóvel pode ser usucapido?',
    'A viabilidade depende do tempo de posse, da natureza do imóvel, da forma como a posse começou e se manteve, da documentação disponível e de outros requisitos legais. É necessária análise individual do caso.',
  ],
  [
    'Quanto tempo preciso morar no imóvel?',
    'O prazo necessário varia conforme a modalidade de usucapião, que depende das circunstâncias da posse, da existência de título e das condições pessoais previstas em lei. A análise do caso concreto define qual modalidade pode ser avaliada.',
  ],
  [
    'Preciso ir a juízo?',
    'Em alguns casos pode ser possível concluir o reconhecimento diretamente em cartório, com ata notarial e documentação. Em outros, a via judicial é a adequada. A estratégia é definida após a análise da documentação.',
  ],
  [
    'O imóvel está no nome de outra pessoa. É possível regularizar?',
    'A usucapião é precisamente um caminho previsto em lei para o reconhecimento da propriedade de quem exerce a posse nos termos legais. A viabilidade depende da análise da posse e da documentação.',
  ],
  [
    'Quanto custa o processo?',
    'Os honorários e as despesas (certidões, ata notarial, emolumentos cartorários ou custas judiciais) são explicados de forma clara antes da contratação, após a análise inicial do caso.',
  ],
  [
    'Quais documentos devo reunir?',
    'Documentos pessoais, comprovantes de endereço antigos, contas, contratos, fotos, testemunhas e qualquer documento que evidencie a posse e o tempo de moradia, além de documentos do imóvel que existirem.',
  ],
]

export default function Usucapiao() {
  useEffect(() => {
    document.title = 'Saes Advocacia — Usucapião e Regularização Imobiliária'
    const descEl = document.querySelector('meta[name="description"]')
    if (descEl) {
      descEl.setAttribute(
        'content',
        'Análise de posse e documentação imobiliária para regularização de imóveis e usucapião extrajudicial ou judicial. Atendimento online com a Dra. Rafaela Saes — OAB/SP 485.223.',
      )
    }
  }, [])

  return (
    <>
      {/* 1. Hero principal */}
      <section className="hero">
        <div className="container-wide hero-grid">
          <div className="hero-copy animate-fade-in-up">
            <p className="eyebrow">USUCAPIÃO E REGULARIZAÇÃO IMOBILIÁRIA</p>
            <h1>Quer regularizar a propriedade do seu imóvel?</h1>
            <p className="hero-subtitle">
              Entenda quais caminhos podem ajudar você a conquistar a segurança jurídica sobre o
              imóvel onde construiu sua história, seja pela via extrajudicial ou judicial. Analise
              seu caso com orientação especializada e descubra quais são as possibilidades para
              transformar anos de moradia em um caminho para o reconhecimento da propriedade.
            </p>
            <a
              href={WHATSAPP_USUCAPIAO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-7 inline-flex"
            >
              <MessageCircle size={18} /> Enviar documentos para análise inicial
            </a>
            <p className="mt-5 max-w-xl text-xs leading-relaxed text-[#3b362d]">
              Atendimento direcionado a usucapião, regularização de imóveis e questões de
              propriedade. Não atuamos com distrato de locação ou rescisão de contrato de aluguel.
            </p>
          </div>
          <div className="hero-photo-wrap">
            <div className="hero-frame" />
            <img
              src={heroPhoto}
              alt="Dra. Rafaela Saes — Usucapião e Regularização Imobiliária"
              className="hero-photo"
            />
          </div>
        </div>
        <div className="scroll-line" />
      </section>

      {/* 2. Bloco de identificação */}
      <section id="situacoes" className="section scroll-mt-24">
        <div className="container-wide">
          <p className="eyebrow">DIAGNÓSTICO DA SITUAÇÃO</p>
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

      {/* 3. Bloco "O que pode ser analisado" (6 cards) */}
      <section id="analise" className="section bg-sand scroll-mt-24">
        <div className="container-wide">
          <p className="eyebrow">AVALIAÇÃO TÉCNICA E JURÍDICA</p>
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
            A viabilidade e o caminho aplicável dependem da análise do caso concreto e dos
            documentos disponíveis.
          </p>
        </div>
      </section>

      {/* 4. Timeline "Como funciona o atendimento" (10 etapas + benefícios) */}
      <section id="como-funciona" className="section scroll-mt-24">
        <div className="container-wide">
          <p className="eyebrow">ATUAÇÃO ESTRUTURADA</p>
          <h2 className="section-title">Como funciona o atendimento</h2>
          <p className="mt-6 max-w-3xl text-lg text-[#3b362d]">
            A regularização imobiliária exige um método rigoroso de levantamento documental e
            análise probatória da posse antes de qualquer providência cartorária ou judicial.
          </p>
          <div className="mt-14 grid gap-16 lg:grid-cols-[1.35fr_.8fr]">
            <div>
              <h3 className="subheading">Etapas do procedimento</h3>
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
              <h3 className="subheading">Benefícios da análise prévia</h3>
              <p className="text-sm text-darkmuted">
                O trabalho técnico e individualizado pode viabilizar:
              </p>
              <ul>
                {benefits.map((b) => (
                  <li key={b}>
                    <Check size={16} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-darkmuted">
                Cada situação apresenta particularidades registrais e fáticas. O resultado depende
                da análise individualizada e da comprovação dos requisitos legais.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* 5. Seção de autoridade ("Sobre a Dra. Rafaela") com foto navy */}
      <section id="sobre" className="section bg-black text-cream scroll-mt-24">
        <div className="container-wide grid items-center gap-14 lg:grid-cols-[.8fr_1.1fr]">
          <div className="about-photo-wrap">
            <img src={aboutPhoto} alt="Dra. Rafaela Saes — Saes Advocacia" />
          </div>
          <div>
            <p className="eyebrow">SOBRE A DRA. RAFAELA</p>
            <h2 className="section-title text-cream">Direito Imobiliário com análise individual</h2>
            <p className="mt-7 text-xl leading-relaxed text-darkmuted">
              Atuação focada na análise e condução de casos envolvendo usucapião e regularização de
              imóveis, com verificação minuciosa da posse, do histórico registral e dos documentos,
              buscando a via mais eficiente para a situação do cliente.
            </p>
            <ul className="authority-list">
              <li>Rafaela Saes — Advogada. OAB/SP 485.223</li>
              <li>Atendimento direcionado à regularização imobiliária e posse.</li>
              <li>Cada imóvel e conjunto probatório recebe análise individual.</li>
              <li>A atuação jurídica não envolve promessa ou garantia de resultado.</li>
              <li>Honorários, despesas e etapas são explicados antes da contratação.</li>
            </ul>
            <a
              href={WHATSAPP_USUCAPIAO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-8 inline-flex"
            >
              <MessageCircle size={18} /> Enviar documentos para análise
            </a>
          </div>
        </div>
      </section>

      {/* 6. Aviso de segmentação discreto */}
      <div className="segment-strip">
        <div className="container-wide">
          Esta página é exclusiva para usucapião, regularização de imóveis e questões de
          propriedade. Não atendemos distrato de aluguel, rescisão de locação, despejo, cobrança de
          aluguel ou conflitos entre locador e inquilino.
        </div>
      </div>

      {/* 7. FAQ (6 perguntas) */}
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
            href={WHATSAPP_USUCAPIAO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-10 inline-flex"
          >
            <MessageCircle size={18} /> Enviar documentos para análise inicial
          </a>
        </div>
      </section>

      {/* 8. Seção de conversão final */}
      <section id="contato" className="section scroll-mt-20">
        <div className="container-wide">
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow">ANÁLISE INDIVIDUAL E DIRETA</p>
            <h2 className="section-title">Envie seus documentos para análise inicial</h2>
            <p className="mt-5 text-lg text-[#3b362d]">
              Fale diretamente com o escritório pelo WhatsApp. A avaliação do seu caso é feita de
              forma individual, com discrição, sem intermediários e sem garantia de resultado.
            </p>
          </div>

          <div className="whatsapp-cta-box">
            <div className="whatsapp-cta-content">
              <div className="whatsapp-badge">
                <MessageCircle size={20} className="text-gold" />
                <span>Atendimento direto pelo WhatsApp</span>
              </div>
              <h3 className="whatsapp-cta-title">
                Como funciona o contato inicial para regularização
              </h3>
              <p className="whatsapp-cta-description">
                Ao clicar no botão abaixo, você será direcionado para o WhatsApp do escritório com
                uma mensagem já pronta para iniciar a conversa. Você poderá relatar o histórico de
                ocupação do imóvel, encaminhar contratos particulares, certidões ou comprovantes
                disponíveis para uma avaliação técnica preliminar.
              </p>

              <div className="whatsapp-features">
                <div className="whatsapp-feature-item">
                  <span className="feature-icon-wrap">
                    <Clock size={18} />
                  </span>
                  <div>
                    <strong>Sem formulários burocráticos</strong>
                    <p>
                      Início do contato diretamente no aplicativo para esclarecer pontos essenciais.
                    </p>
                  </div>
                </div>
                <div className="whatsapp-feature-item">
                  <span className="feature-icon-wrap">
                    <FileText size={18} />
                  </span>
                  <div>
                    <strong>Envio seguro de documentos</strong>
                    <p>
                      Encaminhe documentos da posse, contas, contratos antigos ou fotos do imóvel.
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
                      Informações protegidas pelo sigilo profissional da advocacia e estrita
                      confidencialidade.
                    </p>
                  </div>
                </div>
              </div>

              <div className="whatsapp-action-area">
                <a
                  href={WHATSAPP_USUCAPIAO_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary whatsapp-main-button"
                >
                  <MessageCircle size={20} />
                  <span>Enviar documentos para análise inicial</span>
                </a>
                <p className="whatsapp-disclaimer">
                  A mensagem padrão iniciará a conversa: &ldquo;Olá, Dra. Rafaela. Quero analisar um
                  caso de usucapião e regularização de imóveis.&rdquo;
                </p>
              </div>

              <div className="whatsapp-notice">
                <p>
                  A análise inicial é individual e preliminar, dependendo dos documentos e relatos
                  apresentados. A atuação jurídica não envolve promessa ou garantia de resultado.
                  Honorários e despesas processuais ou cartorárias são detalhados de forma
                  transparente antes de qualquer contratação formal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
