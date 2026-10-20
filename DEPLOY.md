# Guia de Deploy e Publicação Estática — Saes Advocacia

Este projeto é uma Single Page Application (SPA) desenvolvida em **React 19 + TypeScript + Vite + Tailwind CSS**, concebida para funcionar de forma **100% estática e portável**, sem dependência de banco de dados ou backend no momento da navegação. Todas as conversões e contatos de clientes ocorrem de forma direta via WhatsApp com a Dra. Rafaela Saes (OAB/SP 485.223).

---

## ⚠️ AVISO CRÍTICO: Não abrir o `dist/index.html` com duplo clique (`file://`)

> **Por que a tela fica branca se você der duplo clique no `dist/index.html`?**  
> Aplicações modernas (como React + Vite) utilizam módulos JavaScript ES (`<script type="module">`).  
> Por motivos estritos de segurança (CORS e política de mesma origem), **todos os navegadores modernos bloqueiam o carregamento de módulos JavaScript sob o protocolo `file://`**.  
> Resultado: o HTML carrega, mas os scripts são bloqueados pelo navegador antes de executar, provocando **tela branca**.
>
> **Como testar corretamente no computador antes do deploy:**  
> Sempre sirva a aplicação via HTTP local, rodando:
>
> ```bash
> npm run preview
> ```
>
> ou usando qualquer servidor HTTP local (ex: `npx serve dist` ou a extensão Live Server do VS Code). Nunca teste por duplo clique no arquivo local.

---

## 1. Estrutura de Rotas e Roteamento por Subdomínio

O site possui 3 páginas principais gerenciadas pelo React Router:

- **Multipropriedade**: Landing Page de **Cancelamento de Contratos de Multipropriedade**
- **Usucapião**: Landing Page de **Usucapião e Regularização Imobiliária**
- **Privacidade**: **Política de Privacidade e Proteção de Dados (LGPD)**

### Um Único Build Serve Ambos os Subdomínios!

Você **NÃO precisa de dois builds diferentes**. O mesmo build gerado por `npm run build:static` atende os dois subdomínios graças à **detecção automática por hostname**:

1. **`multipropriedade.saesadvogada.com.br`** (ou acesso padrão/localhost):
   - A raiz (`/`) renderiza a página de **Multipropriedade**.
   - O link de usucapião no rodapé/menu direciona para `https://usucapiao.saesadvogada.com.br/`.
2. **`usucapiao.saesadvogada.com.br`**:
   - A raiz (`/`) detecta o subdomínio e renderiza automaticamente a página de **Usucapião**.
   - O link de multipropriedade no rodapé/menu direciona para `https://multipropriedade.saesadvogada.com.br/`.
3. **Ambiente de Testes / Skip (`*.goskip.app`, `localhost`)**:
   - Permanece no modo SPA padrão: `/` exibe Multipropriedade, `/usucapiao` exibe Usucapião e `/privacidade` exibe a política de privacidade.

---

## 2. Passo a Passo do Build Estático

No terminal, dentro da pasta do projeto:

```bash
# 1. Instalar dependências (caso seja a primeira vez)
npm install

# 2. Gerar o build estático para hospedagem cPanel / Apache
npm run build:static
```

O comando `npm run build:static` executa `vite build --base=./`. Isso gera referências relativas para os arquivos empacotados em `dist/`.

Para testar localmente antes de enviar para a hospedagem:

```bash
npm run preview
```

Abra o link exibido (ex: `http://localhost:4173/`) no navegador.

---

## 3. O que há na pasta `dist`?

Após o build, a pasta `dist` conteria:

- `index.html`: Arquivo principal com título, meta tags SEO e favicon da Saes Advocacia.
- `assets/`: Arquivos JavaScript empacotados, CSS minificado e imagens otimizadas.
- `.htaccess`: Arquivo de regras Apache para direcionamento correto de rotas SPA no cPanel (com `Options -MultiViews`, tipos MIME e fallback condicional apenas para rotas virtuais).
- `_redirects`: Arquivo de fallback para Netlify / Cloudflare Pages.
- `logotipo-rafaela-saes.jpeg`: Ícone do escritório usado como favicon.
- `favicon.ico`, `og-image.png`: Metadados e prévia para redes sociais.

> **Importante no cPanel:** O arquivo `.htaccess` começa com um ponto (`.`), sendo considerado arquivo oculto pelo Linux. No **Gerenciador de Arquivos** do cPanel, clique na engrenagem **Configurações** (Settings) no canto superior direito e marque a opção **Mostrar arquivos ocultos (dotfiles)** para garantir que você veja e consiga copiar o `.htaccess` para as pastas de cada subdomínio.

---

## 4. Publicação na Turbo Cloud / cPanel (Passo a Passo)

### Passo 1: Criar/Verificar os Subdomínios no cPanel

1. Acesse o cPanel da Turbo Cloud.
2. Na seção **Domínios** (Domains) -> **Subdomínios** (Subdomains), certifique-se de que os dois subdomínios estão criados:
   - `multipropriedade.saesadvogada.com.br` (pasta raiz geralmente `public_html/multipropriedade` ou `multipropriedade.saesadvogada.com.br`)
   - `usucapiao.saesadvogada.com.br` (pasta raiz geralmente `public_html/usucapiao` ou `usucapiao.saesadvogada.com.br`)

### Passo 2: Upload do Conteúdo da Pasta `dist`

1. Abra o **Gerenciador de Arquivos** (File Manager) do cPanel (ou conecte via FTP/SFTP com FileZilla).
2. Entre na pasta raiz do subdomínio `multipropriedade` (ex: `public_html/multipropriedade/`).
3. **Envie todo o CONTEÚDO de dentro da pasta `dist`** (não envie a pasta `dist` como pasta, mas sim os arquivos que estão dentro dela: `index.html`, pasta `assets`, `.htaccess`, etc.).
4. Repita o mesmo envio para a pasta raiz do subdomínio `usucapiao` (ex: `public_html/usucapiao/`).
   - _Dica:_ Como o build é o mesmo para ambos, você pode compactar os arquivos de `dist` em um arquivo `.zip`, fazer o upload para cada pasta e extrair diretamente pelo Gerenciador de Arquivos do cPanel.

### Passo 3: Certificado SSL (HTTPS via Let's Encrypt)

1. No cPanel, procure por **SSL/TLS Status** ou **Let's Encrypt SSL**.
2. Localize os subdomínios `multipropriedade.saesadvogada.com.br` e `usucapiao.saesadvogada.com.br`.
3. Clique em **Run AutoSSL** ou **Issue** para emitir o certificado gratuito Let's Encrypt.
4. Aguarde a confirmação de que ambos os subdomínios estão com o cadeado verde ativo.

### Passo 4: Verificação Final

1. Abra `https://multipropriedade.saesadvogada.com.br/` no navegador:
   - Deve abrir a página de **Cancelamento de Multipropriedade**.
   - Título na aba: _Saes Advocacia — Cancelamento de Contratos de Multipropriedade_.
2. Abra `https://usucapiao.saesadvogada.com.br/` no navegador:
   - Deve abrir diretamente a página de **Usucapião e Regularização Imobiliária**.
   - Título na aba: _Saes Advocacia — Usucapião e Regularização Imobiliária_.
3. Teste os links no rodapé e menu de cada página — eles alternam corretamente entre os dois subdomínios sem quebrar.
4. Teste recarregar (F5) em qualquer página para certificar-se de que o `.htaccess` evita erro 404.

---

## 5. Resumo do Diagnóstico de Problemas Comuns

| Sintoma                                                  | Causa mais provável                                                                                                                                                                                         | Solução                                                                                                                                                                                                                                                                                               |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tela branca ao dar duplo clique no `index.html`**      | Tentativa de abrir localmente via `file://`. Navegadores bloqueiam módulos ES locais por segurança.                                                                                                         | Use `npm run preview` ou abra via servidor HTTP/hospedagem cPanel.                                                                                                                                                                                                                                    |
| **Tela branca no cPanel (HTML carregando, JS falhando)** | O arquivo `.htaccess` antigo ou mal configurado estava reescrevendo requisições de `assets/*.js` para `index.html`, ou o recurso `MultiViews` do Apache estava ativo conflitando com extensões de arquivos. | Utilize o `.htaccess` atualizado gerado na pasta `dist/` (ele possui `Options -MultiViews`, tipos MIME explícitos e proteção `RewriteCond %{REQUEST_FILENAME} !-f` e `!-d`). Certifique-se de ativar a visualização de arquivos ocultos no Gerenciador de Arquivos do cPanel ao copiar o `.htaccess`. |
| **Tela branca no cPanel (pasta incorreta)**              | Upload incorreto (ex: subiu a pasta `dist/` inteira em vez do seu conteúdo, gerando `subdominio/dist/index.html`) ou arquivos de `assets/` faltando.                                                        | Verifique se `index.html` e a pasta `assets` estão diretamente na raiz da pasta do subdomínio.                                                                                                                                                                                                        |
| **Erro 404 ao recarregar a página (F5)**                 | O arquivo `.htaccess` não foi enviado ou os arquivos ocultos não foram copiados.                                                                                                                            | Certifique-se de que o arquivo `.htaccess` está presente na pasta do subdomínio no cPanel.                                                                                                                                                                                                            |
| **Subdomínio de usucapião abrindo multipropriedade**     | Hostname não identificado ou build antigo.                                                                                                                                                                  | O código atual já possui detecção automática: qualquer hostname iniciando com `usucapiao.` abre a página de usucapião na raiz e atualiza o `<title>` da aba e a meta description dinamicamente. Basta gerar `npm run build:static` e fazer o upload.                                                  |
