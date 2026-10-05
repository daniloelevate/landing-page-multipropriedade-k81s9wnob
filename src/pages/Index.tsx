import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
} from 'lucide-react'
import heroPhoto from '@/assets/foto-rafaela-saes-1-d440f.jpeg'
import aboutPhoto from '@/assets/foto-rafaela-saes-2-9c8cf.jpeg'
import logo from '@/assets/logotipo-rafaela-saes-03c8d.jpeg'
import { criarLead, LeadData } from '@/services/leads'

type FormData = Omit<LeadData, 'ano_contratacao'> & { ano_contratacao: string }
const initial: FormData = {
  nome: '',
  email: '',
  telefone: '',
  produto: '',
  empreendimento: '',
  cidade: '',
  ano_contratacao: '',
  valor_pago: '',
  ainda_pagando: '',
  entregue: '',
  principal_problema: '',
  ja_pediu_cancelamento: '',
  recebeu_proposta: '',
  documentos: '',
  consent_lgpd: false,
}

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

const scrollForm = () =>
  document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })

function TriageForm() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<FormData>(initial)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const navigate = useNavigate()
  const change = (name: keyof FormData, value: string | boolean) => {
    setData((d) => ({ ...d, [name]: value }))
    setErrors((e) => ({ ...e, [name]: '' }))
  }
  const fieldsByStep: Record<number, (keyof FormData)[]> = {
    1: ['produto', 'empreendimento', 'cidade', 'ano_contratacao', 'valor_pago'],
    2: ['ainda_pagando', 'entregue', 'principal_problema', 'ja_pediu_cancelamento'],
    3: ['recebeu_proposta', 'documentos', 'nome', 'email', 'telefone', 'consent_lgpd'],
  }
  const validate = (target = step) => {
    const next: Record<string, string> = {}
    fieldsByStep[target].forEach((k) => {
      if (!data[k]) next[k] = 'Este campo é obrigatório.'
    })
    if (target === 1) {
      const y = Number(data.ano_contratacao)
      if (!y || y < 1900 || y > new Date().getFullYear())
        next.ano_contratacao = 'Informe um ano válido.'
    }
    if (target === 3 && data.email && !/^\S+@\S+\.\S+$/.test(data.email))
      next.email = 'Informe um e-mail válido.'
    if (target === 3 && data.telefone.replace(/\D/g, '').length < 10)
      next.telefone = 'Informe um telefone válido com DDD.'
    setErrors(next)
    return Object.keys(next).length === 0
  }
  const next = () => {
    if (validate()) setStep((s) => s + 1)
  }
  const phone = (v: string) => {
    const n = v.replace(/\D/g, '').slice(0, 11)
    const f =
      n.length > 10
        ? n.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
        : n.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
    change('telefone', f)
  }
  const currency = (v: string) => {
    const n = v.replace(/\D/g, '')
    change(
      'valor_pago',
      n
        ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
            Number(n) / 100,
          )
        : '',
    )
  }
  const whatsappUrl = () => {
    const msg = `Olá, Dra. Rafaela. Quero analisar o cancelamento de um contrato de multipropriedade. O contrato foi assinado em ${data.ano_contratacao}, com o empreendimento ${data.empreendimento}/${data.cidade}. Já paguei aproximadamente ${data.valor_pago} e o principal problema é ${data.principal_problema}. Tenho ${data.documentos} para enviar.`
    return `https://wa.me/5511977179072?text=${encodeURIComponent(msg)}`
  }
  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate(3)) return
    setLoading(true)
    setSubmitError('')
    const wa = whatsappUrl()
    try {
      await criarLead({ ...data, ano_contratacao: Number(data.ano_contratacao) })
      window.open(wa, '_blank', 'noopener,noreferrer')
      navigate('/obrigado')
    } catch {
      setSubmitError(
        'Não foi possível salvar suas informações agora. Você pode tentar novamente ou continuar pelo WhatsApp sem perder o contato.',
      )
    } finally {
      setLoading(false)
    }
  }
  const Input = ({
    name,
    label,
    type = 'text',
    placeholder = '',
  }: {
    name: keyof FormData
    label: string
    type?: string
    placeholder?: string
  }) => (
    <label className="field">
      <span>{label}</span>
      <input
        type={type}
        value={String(data[name])}
        placeholder={placeholder}
        onChange={(e) => change(name, e.target.value)}
      />
      {errors[name] && <small>{errors[name]}</small>}
    </label>
  )
  const Select = ({
    name,
    label,
    options,
  }: {
    name: keyof FormData
    label: string
    options: string[]
  }) => (
    <label className="field">
      <span>{label}</span>
      <select value={String(data[name])} onChange={(e) => change(name, e.target.value)}>
        <option value="">Selecione uma opção</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o.charAt(0).toUpperCase() + o.slice(1)}
          </option>
        ))}
      </select>
      {errors[name] && <small>{errors[name]}</small>}
    </label>
  )
  const Choice = ({
    name,
    label,
    options,
  }: {
    name: keyof FormData
    label: string
    options: string[]
  }) => (
    <fieldset className="field">
      <span>{label}</span>
      <div className="choice-row">
        {options.map((o) => (
          <label key={o} className={data[name] === o ? 'selected' : ''}>
            <input
              type="radio"
              name={name}
              value={o}
              checked={data[name] === o}
              onChange={() => change(name, o)}
            />
            {o.charAt(0).toUpperCase() + o.slice(1)}
          </label>
        ))}
      </div>
      {errors[name] && <small>{errors[name]}</small>}
    </fieldset>
  )
  return (
    <div className="form-shell">
      <div className="mb-9">
        <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-muted">
          <span>Passo {step} de 3</span>
          <span>
            {step === 1
              ? 'Sobre o contrato'
              : step === 2
                ? 'Situação atual'
                : 'Documentos e contato'}
          </span>
        </div>
        <div className="progress">
          <i style={{ width: `${step * 33.333}%` }} />
        </div>
      </div>
      <form onSubmit={submit}>
        <div key={step} className="step-slide">
          {step === 1 && (
            <div className="form-grid">
              <Select
                name="produto"
                label="O contrato é de multipropriedade, cota imobiliária, unidade hoteleira ou outro produto?"
                options={['multipropriedade', 'cota imobiliária', 'unidade hoteleira', 'outro']}
              />
              <div className="md:col-span-2">
                <p className="question-label">
                  Em qual empreendimento e cidade o contrato foi firmado?
                </p>
                <div className="grid gap-5 md:grid-cols-2">
                  <Input
                    name="empreendimento"
                    label="Empreendimento"
                    placeholder="Nome do empreendimento"
                  />
                  <Input name="cidade" label="Cidade" placeholder="Cidade/UF" />
                </div>
              </div>
              <Input
                name="ano_contratacao"
                label="Em que ano ocorreu a contratação?"
                type="number"
                placeholder="Ex.: 2023"
              />
              <label className="field">
                <span>Qual foi o valor aproximado já pago?</span>
                <input
                  value={data.valor_pago}
                  placeholder="R$ 0,00"
                  onChange={(e) => currency(e.target.value)}
                />
                {errors.valor_pago && <small>{errors.valor_pago}</small>}
              </label>
            </div>
          )}
          {step === 2 && (
            <div className="form-grid">
              <Choice
                name="ainda_pagando"
                label="Você ainda está pagando parcelas ou taxas?"
                options={['sim', 'não']}
              />
              <Choice
                name="entregue"
                label="A unidade ou empreendimento já foi entregue?"
                options={['sim', 'não', 'parcialmente']}
              />
              <Select
                name="principal_problema"
                label="Qual é o principal problema?"
                options={[
                  'arrependimento',
                  'impossibilidade de uso',
                  'cobrança',
                  'promessa não cumprida',
                  'dificuldade de cancelamento',
                  'outro',
                ]}
              />
              <Choice
                name="ja_pediu_cancelamento"
                label="Você já pediu o cancelamento à empresa?"
                options={['sim', 'não']}
              />
            </div>
          )}
          {step === 3 && (
            <div className="form-grid">
              <Choice
                name="recebeu_proposta"
                label="Recebeu proposta de distrato ou devolução de valores?"
                options={['sim', 'não']}
              />
              <Select
                name="documentos"
                label="Tem o contrato e os comprovantes de pagamento disponíveis?"
                options={['contrato', 'comprovantes', 'proposta de distrato', 'todos', 'nenhum']}
              />
              <Input name="nome" label="Nome completo" placeholder="Seu nome" />
              <Input name="email" label="E-mail" type="email" placeholder="voce@email.com" />
              <label className="field">
                <span>Telefone/WhatsApp</span>
                <input
                  value={data.telefone}
                  placeholder="(11) 99999-9999"
                  onChange={(e) => phone(e.target.value)}
                />
                {errors.telefone && <small>{errors.telefone}</small>}
              </label>
              <label className="consent md:col-span-2">
                <input
                  type="checkbox"
                  checked={data.consent_lgpd}
                  onChange={(e) => change('consent_lgpd', e.target.checked)}
                />
                <span>
                  Li e concordo com o tratamento dos meus dados para análise do caso e contato,
                  conforme a{' '}
                  <a href="/privacidade" target="_blank">
                    Política de Privacidade
                  </a>
                  .
                </span>
                {errors.consent_lgpd && <small>{errors.consent_lgpd}</small>}
              </label>
            </div>
          )}
        </div>
        {submitError && (
          <div className="error-box">
            <p>{submitError}</p>
            <a href={whatsappUrl()} target="_blank" rel="noreferrer">
              <MessageCircle size={18} /> Continuar pelo WhatsApp
            </a>
          </div>
        )}
        <div className="mt-9 flex flex-wrap justify-between gap-4">
          {step > 1 ? (
            <button type="button" className="btn-outline" onClick={() => setStep((s) => s - 1)}>
              Voltar
            </button>
          ) : (
            <span />
          )}
          {step < 3 ? (
            <button type="button" className="btn-primary" onClick={next}>
              Continuar
            </button>
          ) : (
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Enviando...' : 'Enviar informações'}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default function Index() {
  return (
    <>
      <section className="hero">
        <div className="container-wide hero-grid">
          <div className="hero-copy animate-fade-in-up">
            <img src={logo} alt="Saes Advocacia" className="hero-logo" />
            <p className="eyebrow">CANCELAMENTO DE CONTRATOS DE MULTIPROPRIEDADE</p>
            <h1>Quer cancelar seu contrato de multipropriedade?</h1>
            <p className="hero-subtitle">
              Analise seu contrato e entenda quais caminhos podem ser avaliados para negociar o
              cancelamento, questionar cobranças e buscar uma solução extrajudicial ou judicial.
            </p>
            <button onClick={scrollForm} className="btn-primary mt-7">
              Enviar contrato para análise inicial
            </button>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">
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
          <p className="mt-8 border-l-2 border-gold pl-5 text-muted">
            Todas as possibilidades dependem da análise do contrato e dos documentos do seu caso.
          </p>
        </div>
      </section>

      <section id="como-funciona" className="section scroll-mt-24">
        <div className="container-wide">
          <p className="eyebrow">ATUAÇÃO ESTRUTURADA</p>
          <h2 className="section-title">Análise e negociação de distrato</h2>
          <p className="mt-6 max-w-3xl text-lg text-muted">
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
              <li>Rafaela Saes — Advogada. OAB/SP [preencher com o número da OAB]</li>
              <li>Atendimento online em todo o Brasil.</li>
              <li>Cada contrato e conjunto de documentos recebe análise individual.</li>
              <li>A atuação jurídica não envolve garantia de resultado.</li>
              <li>Honorários e etapas são explicados antes da contratação.</li>
            </ul>
            <button onClick={scrollForm} className="btn-primary mt-8">
              Enviar contrato para análise
            </button>
          </div>
        </div>
      </section>

      <section id="formulario" className="section scroll-mt-20">
        <div className="container-wide">
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow">TRIAGEM INICIAL</p>
            <h2 className="section-title">Envie as informações do seu caso</h2>
            <p className="mt-5 text-lg text-muted">
              Responda algumas perguntas rápidas. Ao final, sua análise será enviada para o
              escritório.
            </p>
          </div>
          <TriageForm />
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
                <AccordionContent className="pb-6 text-base leading-relaxed text-muted">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <button onClick={scrollForm} className="btn-primary mt-10">
            Enviar contrato para análise inicial
          </button>
        </div>
      </section>
    </>
  )
}
