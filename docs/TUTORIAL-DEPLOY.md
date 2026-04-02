# Tutorial: Como Colocar o Observatorio Contenda no Ar

Guia completo para fazer deploy do site **Observatorio Georreferenciado de Contenda/PR**.

O site e uma aplicacao **Astro 4 estatica** (HTML/CSS/JS puro apos build) com busca full-text via Pagefind e mapas Leaflet. Isso significa que voce NAO precisa de servidor Node.js em producao -- basta servir arquivos estaticos.

---

## Indice

1. [Pre-requisitos](#1-pre-requisitos)
2. [Build local](#2-build-local)
3. [Opcao A: Deploy no Vercel (recomendado, gratis)](#3-opcao-a-deploy-no-vercel)
4. [Opcao B: Deploy no Netlify (gratis)](#4-opcao-b-deploy-no-netlify)
5. [Opcao C: Deploy no GitHub Pages (gratis)](#5-opcao-c-deploy-no-github-pages)
6. [Opcao D: Deploy com Docker + VPS](#6-opcao-d-deploy-com-docker--vps)
7. [Opcao E: Deploy no Cloudflare Pages (gratis)](#7-opcao-e-deploy-no-cloudflare-pages)
8. [Configurar dominio personalizado](#8-configurar-dominio-personalizado)
9. [Checklist pos-deploy](#9-checklist-pos-deploy)
10. [Solucao de problemas](#10-solucao-de-problemas)

---

## 1. Pre-requisitos

- **Node.js 20+** instalado (recomendo usar [nvm](https://github.com/nvm-sh/nvm))
- **npm** (vem com o Node.js)
- **Git** instalado
- O repositorio clonado localmente

Verifique suas versoes:

```bash
node -v   # deve ser v20.x ou superior
npm -v    # deve ser v10.x ou superior
git --version
```

---

## 2. Build Local

Antes de qualquer deploy, teste o build localmente:

```bash
# 1. Entre na pasta do site
cd site/

# 2. Instale as dependencias
npm install

# 3. Teste em desenvolvimento (opcional)
npm run dev
# Acesse http://localhost:4321 para ver o site

# 4. Faca o build de producao
npm run build
# Isso executa: astro build && npx pagefind --site dist
# A pasta dist/ contera o site completo

# 5. Preview do build (opcional)
npm run preview
# Acesse http://localhost:4321 para testar a versao final
```

**IMPORTANTE:** O comando `npm run build` faz duas coisas:
1. `astro build` -- gera o HTML/CSS/JS estatico na pasta `dist/`
2. `npx pagefind --site dist` -- indexa o conteudo para busca full-text

A pasta `dist/` e tudo que precisa ir para producao.

---

## 3. Opcao A: Deploy no Vercel

**Recomendado** -- mais simples, gratis, com HTTPS automatico e CDN global.

### Passo a passo:

1. **Suba o codigo para o GitHub:**

```bash
# Na raiz do projeto (observatorio-contenda/)
git init
git add .
git commit -m "primeiro commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/observatorio-contenda.git
git push -u origin main
```

2. **Conecte ao Vercel:**
   - Acesse [vercel.com](https://vercel.com) e faca login com GitHub
   - Clique em **"Add New" > "Project"**
   - Selecione o repositorio `observatorio-contenda`

3. **Configure o projeto:**
   - **Framework Preset:** Astro
   - **Root Directory:** `site` (IMPORTANTE: o site fica dentro da pasta site/)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

4. **Clique em "Deploy"** e aguarde.

5. O Vercel vai gerar uma URL como `observatorio-contenda.vercel.app`

### Deploy automatico:
Cada `git push` no branch `main` dispara um novo deploy automaticamente.

---

## 4. Opcao B: Deploy no Netlify

Outra opcao gratis com HTTPS e CDN.

### Passo a passo:

1. **Suba o codigo para o GitHub** (mesmo passo da Opcao A)

2. **Conecte ao Netlify:**
   - Acesse [netlify.com](https://netlify.com) e faca login com GitHub
   - Clique em **"Add new site" > "Import an existing project"**
   - Selecione o repositorio

3. **Configure:**
   - **Base directory:** `site`
   - **Build command:** `npm run build`
   - **Publish directory:** `site/dist`

4. **Clique em "Deploy site"**

### Alternativa -- Deploy manual via CLI:

```bash
# Instale o Netlify CLI
npm install -g netlify-cli

# Na pasta site/, apos o build
cd site/
npm run build

# Deploy de preview
netlify deploy --dir=dist

# Deploy em producao
netlify deploy --dir=dist --prod
```

---

## 5. Opcao C: Deploy no GitHub Pages

Gratis, hospedado diretamente no GitHub.

### Passo a passo:

1. **Crie o arquivo de workflow** `.github/workflows/deploy.yml` na raiz do repositorio:

```yaml
name: Deploy Observatorio Contenda

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: site/package-lock.json

      - name: Install dependencies
        working-directory: site
        run: npm ci

      - name: Build
        working-directory: site
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: site/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

2. **Ative o GitHub Pages:**
   - Va em Settings > Pages no repositorio
   - Em "Source", selecione **"GitHub Actions"**

3. **Ajuste o `astro.config.mjs`** se o site ficar em subpath:

```js
// Se a URL for https://usuario.github.io/observatorio-contenda/
export default defineConfig({
  site: 'https://usuario.github.io',
  base: '/observatorio-contenda',
  // ... resto da config
});
```

4. **Faca push** e o deploy sera automatico.

---

## 6. Opcao D: Deploy com Docker + VPS

Para quem quer hospedar em servidor proprio (DigitalOcean, AWS, Hetzner, etc).

O projeto ja inclui um **Dockerfile** pronto que faz:
- Stage 1: Build com Node.js 20 Alpine
- Stage 2: Serve com Nginx Alpine (imagem final ~30MB)

### Passo a passo:

1. **No servidor, instale Docker:**

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
# Faca logout e login novamente
```

2. **Clone o repositorio e faca build:**

```bash
git clone https://github.com/SEU_USUARIO/observatorio-contenda.git
cd observatorio-contenda/site/

# Build da imagem
docker build -t observatorio-contenda .

# Execute o container
docker run -d \
  --name observatorio \
  --restart unless-stopped \
  -p 80:80 \
  observatorio-contenda
```

3. O site estara disponivel na porta 80 do servidor.

### Com Docker Compose (recomendado para producao):

Crie `docker-compose.yml` na pasta `site/`:

```yaml
version: '3.8'

services:
  observatorio:
    build: .
    container_name: observatorio-contenda
    restart: unless-stopped
    ports:
      - "80:80"
```

```bash
# Subir
docker compose up -d

# Atualizar apos mudancas
git pull
docker compose up -d --build

# Ver logs
docker compose logs -f
```

### Adicionando HTTPS com Caddy (alternativa ao Nginx):

Crie `Caddyfile` no servidor:

```
observatorio.contenda.pr.gov.br {
    reverse_proxy observatorio:80
}
```

E ajuste o `docker-compose.yml`:

```yaml
version: '3.8'

services:
  observatorio:
    build: .
    container_name: observatorio-contenda
    restart: unless-stopped
    expose:
      - "80"

  caddy:
    image: caddy:alpine
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data

volumes:
  caddy_data:
```

O Caddy gera e renova certificados HTTPS automaticamente via Let's Encrypt.

---

## 7. Opcao E: Deploy no Cloudflare Pages

Gratis, CDN global extremamente rapida.

### Passo a passo:

1. Acesse [dash.cloudflare.com](https://dash.cloudflare.com)
2. Va em **Workers & Pages > Create application > Pages**
3. Conecte ao GitHub e selecione o repositorio
4. Configure:
   - **Framework preset:** Astro
   - **Root directory:** `site`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Clique em **"Save and Deploy"**

---

## 8. Configurar Dominio Personalizado

O `astro.config.mjs` esta configurado para `https://observatorio.contenda.pr.gov.br`.

### Para Vercel/Netlify/Cloudflare:
1. No painel do servico, va em **Domain Settings**
2. Adicione `observatorio.contenda.pr.gov.br`
3. No DNS do dominio, crie um registro CNAME:
   - **Nome:** `observatorio`
   - **Valor:** URL fornecida pelo servico (ex: `cname.vercel-dns.com`)

### Para VPS com IP fixo:
No DNS do dominio, crie um registro A:
- **Nome:** `observatorio`
- **Valor:** IP do servidor (ex: `203.0.113.50`)

### Atualize o astro.config.mjs se mudar o dominio:

```js
export default defineConfig({
  site: 'https://SEU-DOMINIO-AQUI',
  // ...
});
```

---

## 9. Checklist Pos-Deploy

Apos o site estar no ar, verifique:

- [ ] **Pagina inicial** carrega com hero, cards de metodologia e documentos recentes
- [ ] **Mapa** (`/mapa`) carrega o Leaflet com as feicoes GeoJSON (limite municipal, centro urbano, praca, parque)
- [ ] **Busca** (`/busca`) funciona com Pagefind (digite um termo e veja resultados)
- [ ] **Temas** (`/temas`) lista os temas extraidos das tags
- [ ] **Documentos** (`/documentos/[slug]`) abre com conteudo, metadados e localizacao
- [ ] **HTTPS** esta ativo (cadeado verde no navegador)
- [ ] **Responsividade** -- teste em celular (menu hamburger deve funcionar)
- [ ] **SEO** -- verifique Open Graph tags com [metatags.io](https://metatags.io)
- [ ] **Sitemap** acessivel em `/sitemap-index.xml`

---

## 10. Solucao de Problemas

### Build falha com erro de gray-matter ou marked
Verifique se o `astro.config.mjs` tem a configuracao de SSR noExternal:
```js
vite: {
  ssr: {
    noExternal: ['gray-matter', 'marked'],
  },
}
```

### Pagefind nao funciona (busca vazia)
- Verifique se `npx pagefind --site dist` executou apos `astro build`
- Confirme que a pasta `dist/pagefind/` existe e contem arquivos `.pf_*`
- O Pagefind carrega via CDN (`/pagefind/pagefind-ui.js`), precisa estar na raiz do site

### Mapa nao carrega
- Verifique se `/data/contenda.geojson` esta acessivel (teste no navegador)
- O Leaflet carrega via CDN (unpkg.com) -- precisa de internet

### Documentos retornam 404
- Confirme que a pasta `vault/` com os arquivos `.md` esta no mesmo nivel que `site/`
- O `markdown.ts` busca em `../vault` relativo ao site
- Estrutura esperada:
  ```
  observatorio-contenda/
    vault/          <-- arquivos .md aqui
    site/           <-- codigo Astro aqui
  ```

### Erro de permissao no Docker
```bash
sudo chown -R 1000:1000 site/
```

---

## Resumo Rapido: Qual opcao escolher?

| Opcao | Custo | Dificuldade | HTTPS | CDN | Deploy Auto |
|-------|-------|-------------|-------|-----|-------------|
| **Vercel** | Gratis | Facil | Sim | Sim | Sim |
| **Netlify** | Gratis | Facil | Sim | Sim | Sim |
| **GitHub Pages** | Gratis | Medio | Sim | Sim | Sim |
| **Docker + VPS** | ~$5/mes | Avancado | Manual* | Nao | Manual |
| **Cloudflare Pages** | Gratis | Facil | Sim | Sim | Sim |

\* Com Caddy, HTTPS e automatico.

**Recomendacao para comecar:** Use **Vercel** ou **Cloudflare Pages**. Sao gratis, simples de configurar e incluem HTTPS + CDN global. Para um projeto governamental que precisa de controle total, considere **Docker + VPS**.

---

*Tutorial gerado em 2026-04-02 para o projeto Observatorio Contenda v1.0.0*
