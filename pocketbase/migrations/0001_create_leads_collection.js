migrate(
  (app) => {
    const collection = new Collection({
      name: 'leads',
      type: 'base',
      listRule: null,
      viewRule: null,
      createRule: '',
      updateRule: null,
      deleteRule: null,
      fields: [
        { name: 'nome', type: 'text', required: true, max: 120 },
        { name: 'email', type: 'email', required: true },
        { name: 'telefone', type: 'text', required: true, max: 30 },
        {
          name: 'produto',
          type: 'select',
          required: true,
          values: ['multipropriedade', 'cota imobiliária', 'unidade hoteleira', 'outro'],
          maxSelect: 1,
        },
        { name: 'empreendimento', type: 'text', required: true, max: 150 },
        { name: 'cidade', type: 'text', required: true, max: 100 },
        {
          name: 'ano_contratacao',
          type: 'number',
          required: true,
          onlyInt: true,
          min: 1900,
          max: 2100,
        },
        { name: 'valor_pago', type: 'text', max: 50 },
        {
          name: 'ainda_pagando',
          type: 'select',
          required: true,
          values: ['sim', 'não'],
          maxSelect: 1,
        },
        {
          name: 'entregue',
          type: 'select',
          required: true,
          values: ['sim', 'não', 'parcialmente'],
          maxSelect: 1,
        },
        {
          name: 'principal_problema',
          type: 'select',
          required: true,
          values: [
            'arrependimento',
            'impossibilidade de uso',
            'cobrança',
            'promessa não cumprida',
            'dificuldade de cancelamento',
            'outro',
          ],
          maxSelect: 1,
        },
        {
          name: 'ja_pediu_cancelamento',
          type: 'select',
          required: true,
          values: ['sim', 'não'],
          maxSelect: 1,
        },
        {
          name: 'recebeu_proposta',
          type: 'select',
          required: true,
          values: ['sim', 'não'],
          maxSelect: 1,
        },
        {
          name: 'documentos',
          type: 'select',
          required: true,
          values: ['contrato', 'comprovantes', 'proposta de distrato', 'todos', 'nenhum'],
          maxSelect: 1,
        },
        { name: 'consent_lgpd', type: 'bool', required: true },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE INDEX idx_leads_created ON leads (created)',
        'CREATE INDEX idx_leads_email ON leads (email)',
      ],
    })
    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('leads')
    app.delete(collection)
  },
)
