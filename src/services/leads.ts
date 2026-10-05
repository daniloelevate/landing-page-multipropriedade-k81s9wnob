import pb from '@/lib/pocketbase/client'

export type LeadData = {
  nome: string
  email: string
  telefone: string
  produto: string
  empreendimento: string
  cidade: string
  ano_contratacao: number
  valor_pago: string
  ainda_pagando: string
  entregue: string
  principal_problema: string
  ja_pediu_cancelamento: string
  recebeu_proposta: string
  documentos: string
  consent_lgpd: boolean
}

export const criarLead = (lead: LeadData) => pb.collection('leads').create(lead)
