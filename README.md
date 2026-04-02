# Observatorio Georreferenciado de Contenda/PR

Plataforma open-source de transparencia municipal que transforma um vault Obsidian em um site estatico com mapa interativo, busca full-text e API de validacao/geocodificacao.

## Objetivo

Centralizar, organizar e publicar informacoes georreferenciadas sobre o municipio de Contenda/PR -- documentos publicos, entidades, temas ambientais e dossies -- de forma acessivel a qualquer cidadao.

## Arquitetura

```
+------------------+
|   Vault Obsidian |   Markdown + YAML frontmatter
|   (vault/)       |   Fonte unica de verdade
+--------+---------+
         |
    +----v----+          +----------------+
    |  Astro  |--------->|   Site Estatico|
    | (site/) |          |  Leaflet + Map |
    +---------+          |  Pagefind      |
         |               +----------------+
         |                    porta 3000
    +----v--------+
    |  FastAPI    |      API de validacao,
    |  (api/)     |      geocodificacao e
    |             |      normalizacao
    +-------------+
         porta 8000

    +-------------+
    |   Caddy     |      Reverse proxy (opcional)
    | (Caddyfile) |      site.localhost / api.localhost
    +-------------+
         porta 80
```

## Estrutura de Pastas

```
observatorio-contenda/
|-- api/                    # Backend FastAPI
|   |-- Dockerfile
|   |-- requirements.txt
|   |-- main.py
|   |-- models/
|   |   +-- schemas.py      # Pydantic v2 schemas
|   |-- routers/
|   |   |-- health.py
|   |   |-- validate.py
|   |   |-- entities.py
|   |   +-- geocode.py
|   |-- services/
|   |   |-- frontmatter_validator.py
|   |   |-- entity_normalizer.py
|   |   +-- geocoder.py
|   +-- tests/
|       |-- conftest.py
|       |-- test_api.py
|       |-- test_health.py
|       |-- test_validate.py
|       |-- test_entities.py
|       +-- test_geocode.py
|
|-- site/                   # Frontend Astro
|   |-- Dockerfile
|   |-- package.json
|   |-- astro.config.mjs
|   |-- src/
|   +-- public/
|
|-- vault/                  # Vault Obsidian (fonte de dados)
|   |-- 00_sistema/
|   |-- 10_municipio/
|   |-- 20_temas/
|   |-- 30_fontes_publicas/
|   |-- 40_entidades/
|   |-- 50_dossies/
|   |-- 60_publicacao/
|   |-- 70_assets/
|   |-- 80_snapshots_api/
|   +-- 90_logs_execucao/
|
|-- docker-compose.yml
|-- Caddyfile
|-- .env.example
|-- .gitignore
+-- README.md
```

## Quick Start

```bash
# 1. Clone o repositorio
git clone https://github.com/seu-usuario/observatorio-contenda.git
cd observatorio-contenda

# 2. Copie e ajuste as variaveis de ambiente
cp .env.example .env

# 3. Suba os containers
docker compose up --build
```

Acesse:

| Servico          | URL                          |
|------------------|------------------------------|
| Site (frontend)  | http://localhost:3000        |
| API (backend)    | http://localhost:8000        |
| API Docs (Swagger) | http://localhost:8000/docs |

Para usar o Caddy reverse proxy (opcional):

```bash
docker compose --profile proxy up --build
```

Entao acesse `http://site.localhost` e `http://api.localhost`.

## Desenvolvimento Local

### API (FastAPI)

```bash
cd api
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# Testes
python -m pytest tests/ -v
```

### Site (Astro)

```bash
cd site
npm install
npm run dev     # Dev server na porta 4321
npm run build   # Build estatico em dist/
```

## Vault

O vault Obsidian em `vault/` e a fonte unica de verdade do projeto. Cada nota Markdown deve conter um frontmatter YAML com os campos obrigatorios:

```yaml
---
titulo: Nome do Documento
tipo: documento | entidade | tema | fonte | dossie | publicacao
status: rascunho | revisao | publicado | arquivado
criado_em: 2024-01-15
atualizado_em: 2024-06-01
tags:
  - meio_ambiente
  - florestal
---
```

### Campos Obrigatorios

| Campo           | Tipo     | Descricao                              |
|-----------------|----------|----------------------------------------|
| `titulo`        | string   | Nome legivel do documento              |
| `tipo`          | enum     | Categoria da nota                      |
| `status`        | enum     | Estado atual do documento              |
| `criado_em`     | date     | Data de criacao (YYYY-MM-DD)           |
| `atualizado_em` | date     | Data da ultima atualizacao             |

### Validacao

Use a API para validar notas antes de publicar:

```bash
curl -X POST http://localhost:8000/api/v1/validate-note \
  -H 'Content-Type: application/json' \
  -d '{"markdown": "---\ntitulo: Teste\ntipo: documento\nstatus: rascunho\ncriado_em: 2024-01-01\natualizado_em: 2024-01-01\n---\nConteudo."}'
```

## API Endpoints

Todas as rotas estao sob o prefixo `/api/v1`.

| Metodo | Rota                          | Descricao                                      |
|--------|-------------------------------|-------------------------------------------------|
| GET    | `/`                           | Redireciona para `/docs`                        |
| GET    | `/api/v1/health`              | Health check (status, versao, uptime, timestamp)|
| POST   | `/api/v1/validate-note`       | Valida frontmatter YAML de uma nota Markdown    |
| POST   | `/api/v1/normalize-entity`    | Normaliza nome de entidade e retorna variantes  |
| GET    | `/api/v1/geocode?q=...`       | Geocodifica endereco em Contenda/PR             |
| GET    | `/api/v1/reverse-geocode?lat=...&lon=...` | Geocodificacao reversa (lat/lon -> endereco) |

## Roadmap

- [ ] Pipeline CI/CD (GitHub Actions: lint, test, build, deploy)
- [ ] Integracao Pagefind para busca full-text no site
- [ ] Mapa interativo Leaflet com camadas tematicas
- [ ] Scraper automatizado de fontes publicas (diario oficial, IBGE)
- [ ] Autenticacao para API de escrita (JWT)
- [ ] Dashboard de metricas do vault (cobertura, notas pendentes)
- [ ] Exportacao para PDF/GeoJSON
- [ ] Webhook para sync automatico Obsidian -> rebuild do site

## Licenca

MIT License -- veja [LICENSE](LICENSE) para detalhes.
