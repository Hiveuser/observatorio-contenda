# Observatorio Contenda

Plataforma de mapeamento colaborativo da Regiao Metropolitana de Curitiba. Desenvolvido como parte do Programa das Nascentes do Petropolitico para mapear iniciativas de recuperacao de areas degradas e ocupacao urbana irregular na APM de Acquas Claras.

## Arquitetura

- **site/**: Frontend Astro com Leaflet + Mapbox
- **scripts/**: Scripts de conversao de dados
- **data/**: Dados geoespaciais GeoJSON

## Quick Start

```bash
cd site
npm install
npm run dev```

## Vercel Deploy

1. Importar repo em vercel.com/new
2. Root Directory: `site`
3. Build Command: `npm run build`
4. Output Directory: `dist`

## Variaveis de Ambiente

```bash
cp .env.example .env
```

## License

MIT