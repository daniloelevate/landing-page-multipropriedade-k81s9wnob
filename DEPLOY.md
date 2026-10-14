# Guia de Deploy e Publicação Estática (Backup / Redundância)

Este projeto é uma Single Page Application (SPA) desenvolvida em **React 19 + TypeScript + Vite + Tailwind CSS**, concebida para funcionar de forma **100% estática e portável**, sem dependência de banco de dados ou backend no momento da navegação. Todas as conversões e contatos de clientes ocorrem de forma direta via WhatsApp.

---

## 1. Estrutura de Rotas do Projeto

O site possui 3 rotas principais gerenciadas pelo React Router:

- `/` — Landing Page de **Cancelamento de Contratos de Multipropriedade**
- `/usucapiao` — Landing Page de **Usucapião e Regularização Imobiliária**
- `/privacidade` — **Política de Privacidade e Proteção de Dados (LGPD)**

### Subdomínios Sugeridos

O projeto está preparado para atender tanto domínios separados/subdomínios quanto um domínio unificado:

1. **`multipropriedade.saesadvogada.com.br`**: aponta para a raiz (`/`).
2. **`usucapiao.saesadvogada.com.br`**:
   - Se apontado para o mesmo build, a rota `/usucapiao` pode ser acessada diretamente graças aos rewrites/redirecionamentos configurados.
   - O rodapé e cabeçalho já contam com links de alternância entre as duas áreas de atuação, permitindo que a usuária navegue fluidamente entre `/` e `/usucapiao` no mesmo domínio ou subdomínio.

---

## 2. Como Gerar o Build Estático

Para gerar os arquivos estáticos de produção, execute no seu terminal:

```bash
# Instalar dependências (caso seja a primeira vez)
npm install

# Gerar o build de produção padrão
npm run build

# OU gerar o build estático com caminhos relativos (base: ./)
npm run build:static
```

> **Dica sobre caminhos relativos (`npm run build:static`):**  
> O comando `npm run build:static` executa `vite build --base=./`. Isso gera referências relativas para os assets (scripts, CSS e imagens), permitindo que a aplicação seja hospedada na raiz de um domínio (`https://exemplo.com/`) ou em qualquer subpasta (ex: `https://exemplo.com/landing/`) sem quebrar os arquivos.

---

## 3. O que há na pasta `dist`?

Após a execução do build, a pasta `dist` é criada na raiz do projeto com o seguinte conteúdo:

- `index.html`: Arquivo principal da aplicação.
- `assets/`: Arquivos JavaScript empacotados, folhas de estilo CSS minificadas e imagens otimizadas.
- `_redirects`: Arquivo de rewrite para compatibilidade automática com **Netlify** e **Cloudflare Pages** (`/* /index.html 200`).
- `.htaccess`: Arquivo de fallback para servidores **Apache / LiteSpeed / cPanel** (ex: Hostinger).
- `favicon.ico`, `og-image.png`: Favicons e imagem de prévia para redes sociais.

Todo o conteúdo de `dist` é estático e pode ser servido por qualquer servidor web HTTP.

---

## 4. Como Publicar em Hospedagens Externas

### Opção A: Vercel

A Vercel reconhece projetos Vite automaticamente e já possui o arquivo `vercel.json` configurado na raiz deste repositório para rewrite de rotas SPA.

1. Acesse [vercel.com](https://vercel.com/) e faça login.
2. Clique em **Add New...** -> **Project**.
3. Conecte seu repositório Git (GitHub ou GitLab).
4. As configurações padrão detectadas pelo Vercel serão:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Clique em **Deploy**.
6. Para configurar seu domínio ou subdomínio:
   - Vá em **Project Settings** -> **Domains**.
   - Adicione `multipropriedade.saesadvogada.com.br` ou `usucapiao.saesadvogada.com.br` e configure os registros CNAME no seu DNS.

---

### Opção B: Netlify ou Cloudflare Pages

O arquivo `public/_redirects` é copiado automaticamente para a pasta `dist/_redirects` durante o build, garantindo que qualquer rota (`/usucapiao`, `/privacidade`) recarregue sem erro 404.

#### Via Arrastar e Soltar (Drag & Drop):

1. **Netlify:**
   - Faça login no [netlify.com](https://app.netlify.com/).
   - Acesse a aba **Sites**.
   - Arraste a pasta `dist` gerada no seu computador para a área de upload ("Drag and drop your site output folder here").
   - O deploy é imediato.
2. **Cloudflare Pages:**
   - Acesse o painel da [Cloudflare](https://dash.cloudflare.com/) -> **Workers & Pages** -> **Create application** -> **Pages** -> **Upload assets**.
   - Dê um nome ao projeto (ex: `saes-advocacia-multipropriedade`).
   - Arraste a pasta `dist` e clique em **Deploy site**.

#### Via Conexão com Repositório Git:

- **Build command:** `npm run build` (ou `npm run build:static`)
- **Build output directory:** `dist`

---

### Opção C: Hospedagem cPanel / Hospedagem Compartilhada (Hostinger, HostGator, Locaweb)

O site WordPress principal da Dra. Rafaela reside em uma hospedagem compartilhada (como Hostinger). Você pode hospedar as landing pages em um subdomínio (`multipropriedade.saesadvogada.com.br`) ou em uma subpasta (`saesadvogada.com.br/multipropriedade/`) facilmente:

1. No seu computador, gere o build:
   ```bash
   npm run build:static
   ```
2. Acesse o **Gerenciador de Arquivos** (File Manager) do cPanel ou conecte-se via **FTP/SFTP**.
3. Navegue até a pasta de destino correspondente:
   - Para um subdomínio (ex: `multipropriedade.saesadvogada.com.br`): a pasta raiz geralmente é `public_html/multipropriedade` ou um diretório com o nome do subdomínio.
   - Para uma subpasta: crie uma pasta dentro de `public_html` (ex: `public_html/multipropriedade`).
4. **Envie todo o CONTEÚDO da pasta `dist`** (não a pasta `dist` em si, mas os arquivos dentro dela: `index.html`, pasta `assets/`, `.htaccess`, etc.).
5. Certifique-se de que os arquivos ocultos (que começam com ponto, como `.htaccess`) estejam visíveis e tenham sido enviados. O arquivo `.htaccess` garante que, quando o visitante acessar ou recarregar diretamente `https://multipropriedade.saesadvogada.com.br/usucapiao`, o Apache entregue o `index.html` e a rota funcione sem erro 404.
6. Um modelo documentado do arquivo `.htaccess` também está disponível na pasta `docs/deploy/htaccess-example.txt`.

---

### Opção D: Servidor Próprio com Nginx (VPS / Cloud)

Se preferir utilizar um servidor VPS próprio com Nginx:

1. Um modelo completo de configuração está disponível em `docs/deploy/nginx-example.conf`.
2. A diretiva essencial para SPA é:
   ```nginx
   location / {
       try_files $uri $uri/ /index.html;
   }
   ```

---

## 5. Testando Localmente o Build Estático

Você pode testar exatamente o comportamento do build de produção estático antes de subir para qualquer servidor:

```bash
# 1. Gerar o build estático
npm run build:static

# 2. Iniciar o servidor de preview local
npm run preview
```

O Vite iniciará um servidor estático local (geralmente em `http://localhost:4173/`). Acesse `/usucapiao` e recarregue a página (F5) para verificar que o roteamento SPA e todos os assets funcionam perfeitamente.
