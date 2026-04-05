---
title: "FLOR.AI — Arranjos Florais com Nativas Brasileiras"
slug: flor-ai
status: planejamento
dominio: florai.app
stack: "Vite + React + Konva.js + Tailwind + Supabase"
mvp_prazo: "6-8 semanas"
created_at: 2026-04-05T00:00:00.000Z
public: true
---

# 🌸 FLOR.AI — Documentação Completa

**Arranjos florais digitais com plantas nativas brasileiras — bonito, educativo e 100% brasileiro.**

| Campo        | Valor                           |
| ------------ | ------------------------------- |
| Status       | 🟡 Planejamento                 |
| Domínio Alvo | florai.app                      |
| MVP Previsto | 6-8 semanas                     |
| Data         | 2026-04-05                      |
| Por          | Danilo + Maria (Secretária)     |

---

## 📋 Resumo Executivo

FLOR.AI é uma plataforma web onde usuários podem:

1. Explorar plantas nativas brasileiras organizadas por bioma
2. Criar arranjos florais digitais com drag-and-drop
3. Compartilhar criações em um mural público
4. Aprender sobre biomas brasileiros de forma lúdica

**Diferencial:** Nenhum app concorrente foca em nativas brasileiras — é oceano azul.

---

## 🎯 Visão e Proposta de Valor

**Conceito Central:** "Crie arranjos lindos com plantas nativas, aprenda sobre nossos biomas e descubra como levar essa beleza pro seu espaço real."

| Flority (Inspiração)    | FLOR.AI (Nós)                            |
| ----------------------- | ---------------------------------------- |
| Flores genéricas        | Espécies nativas brasileiras             |
| Sem contexto ecológico  | Educação botânica embedada               |
| Foco em buquês          | Arranjos + paisagismo                    |
| Global (sem identidade) | 100% Brasil, identidade bioma            |
| Entretenimento puro     | Entretenimento + aprendizado + propósito |

**Funil:** App gratuito → Conteúdo educativo → Lead qualificado → Projeto paisagístico

---

## 📊 Análise Competitiva — Reverse Engineer: Flority.digital

> Análise direta do produto em 2026-04-05

### Stack Técnica do Flority (confirmada)

* Vanilla JavaScript ES6+ (sem React/Vue/Angular)
* HTML5 Canvas API (`renderArrangement`, `canvas.toBlob`)
* Drag & Drop API nativa
* Cloudinary CDN (upload + galeria pública)
* URL-based State (Base64 JSON no hash → sharelinks)
* Google Analytics 4

### Core Loop do Flority

1. Abre app → Canvas vazio com hint
2. Arrasta flor → animação spring 0.38s + toast
3. Ajusta tamanho/rotação/posição
4. Resultado bonito → compartilha WhatsApp/clipboard
5. Wall of Flowers → social proof → volta a criar

### Modelo de Negócio do Flority

* **100% gratuito** — sem paywall, sem anúncios
* Watermark `"made with flority.digital"` em cada export
* Monetização: **nenhuma detectável** (sustentabilidade questionável)

### Gaps que o FLOR.AI Resolve

| Gap Flority              | FLOR.AI resolve assim                        |
| ------------------------ | -------------------------------------------- |
| Sem identidade           | 100% Brasil — nativas por bioma              |
| Sem educação             | Ficha técnica por espécie                    |
| Sem monetização          | Freemium + Premium R$ 19,90 + Pro R$ 99      |
| Sem funil de negócios    | Leads diretos para paisagismo (Danilo)       |
| Paleta genérica          | Banco curado de espécies nativas             |
| Sem propósito            | Educação botânica = retenção + missão        |

---

## 🌿 Estrutura por Biomas

**Mata Atlântica** ⭐ foco inicial: Manacá-da-serra, Quaresmeira, Jerivá, Juçara, Cipó-uva, Bromélias

**Cerrado:** Sempre-viva, Pé-de-moça, Barbatimão, Buriti, Pequi

**Amazônia:** Orquídeas nativas, Bromélias (Aechmea, Vriesea), Açaí ornamental

**Caatinga:** Mandacaru, Xique-xique, Coroa-de-frade, Umbu, Imburana

**Pantanal:** Vitória-régia, Aguapé, Laelia lundii

**Pampa:** Gramíneas ornamentais, Senecio, Aroeira, Cina-cina

---

## 🛠️ Stack Técnica

| Camada       | Tecnologia                  |
| ------------ | --------------------------- |
| Build        | Vite                        |
| UI           | React + TypeScript          |
| Canvas       | Konva.js                    |
| Estilos      | Tailwind CSS                |
| Backend/Auth | Supabase                    |
| Deploy       | Vercel                      |

---

## 📅 Roadmap MVP (6–8 semanas)

| Semana | Entrega                                               |
| ------ | ----------------------------------------------------- |
| 1      | Setup Vite + React + Tailwind + Konva.js. Canvas básico |
| 2      | Biblioteca Mata Atlântica. Drag-and-drop              |
| 3      | Controles: tamanho, rotação, opacidade, flip, z-index |
| 4      | Sistema de biomas. Filtro. Card de espécie            |
| 5      | Export PNG (watermark). Wall of Flowers. Share        |
| 6      | Supabase: auth, save designs, galeria pessoal         |
| 7      | Mobile responsivo. PWA. Polimento UX                  |
| 8      | Beta fechado. Feedback. Bug fixes                     |

---

## 💰 Modelo de Receita

| Plano       | Preço        | Features                                     |
| ----------- | ------------ | -------------------------------------------- |
| Grátis      | R$ 0         | Editor, 1 bioma, export com watermark, Wall  |
| Premium     | R$ 19,90/mês | 6 biomas, sem watermark, save ilimitado, PDF |
| Pro         | R$ 99/mês    | API, embed, colaboração, relatórios          |

---

## 📊 Métricas de Sucesso — 3 Meses

| Métrica             | Meta    |
| ------------------- | ------- |
| Usuários únicos/mês | 1.000   |
| Arranjos criados    | 5.000   |
| Conversões Premium  | 50      |
| Leads paisagismo    | 10      |
| MRR                 | R$ 995  |

---

## 🚀 Próximos Passos

* Comprar domínio `florai.app`
* Criar repositório GitHub `florai`
* Setup Vite + React + Konva.js + Tailwind
* 15 espécies iniciais da Mata Atlântica
* Contratar ilustrador para assets botânicos
* Configurar Supabase + TinaCMS
* Landing page com email capture
