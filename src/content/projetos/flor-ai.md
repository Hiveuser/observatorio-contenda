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

**Status:** 🟡 Planejamento | **Domínio Alvo:** florai.app | **Por:** Danilo + Maria

---

## 📋 Resumo Executivo

**FLOR.AI** é uma plataforma web onde usuários podem:

1. Explorar plantas nativas brasileiras organizadas por bioma
2. Criar arranjos florais digitais com drag-and-drop
3. Compartilhar criações em um mural público
4. Aprender sobre biomas brasileiros de forma lúdica

**Diferencial:** Nenhum app concorrente foca em nativas brasileiras — é oceano azul.

---

## 🎯 Visão e Proposta de Valor

> "Crie arranjos lindos com plantas nativas, aprenda sobre nossos biomas e descubra como levar essa beleza pro seu espaço real."

**Funil:** App gratuito → Conteúdo educativo → Lead qualificado → Projeto paisagístico (Danilo)

| Flority (Inspiração)    | FLOR.AI (Nós)                            |
| ----------------------- | ---------------------------------------- |
| Flores genéricas        | Espécies nativas brasileiras             |
| Sem contexto ecológico  | Educação botânica embedada               |
| Foco em buquês          | Arranjos + paisagismo                    |
| Global (sem identidade) | 100% Brasil, identidade bioma            |
| Entretenimento puro     | Entretenimento + aprendizado + propósito |

---

## 📊 Reverse Engineer: Flority.digital

> Análise direta em 2026-04-05

**Stack confirmada:** Vanilla JS + HTML5 Canvas API + Cloudinary CDN + GA4. Sem React/Vue/Angular.

**Modelo de negócio:** 100% gratuito, sem paywall, sem anúncios. Watermark `"made with flority.digital"` em cada export. Monetização real: nenhuma.

**Core Loop:**
1. Canvas vazio → arrasta flor (0.38s animação) → toast "added ✓"
2. Ajusta: tamanho 40–220px, rotação, opacidade, flip, z-index
3. Export PNG → WhatsApp/clipboard → Wall of Flowers

### Gaps que o FLOR.AI explora

| Gap Flority                 | FLOR.AI resolve assim                   |
| --------------------------- | --------------------------------------- |
| Sem identidade              | 100% Brasil — nativas por bioma         |
| Sem educação                | Ficha técnica por espécie               |
| Sem monetização             | Freemium + Premium R$ 19,90 + Pro R$ 99 |
| Sem funil de negócios       | Leads diretos para paisagismo           |
| Paleta fixa 50 flores       | Banco curado de nativas (escalável)     |

---

## 🌿 Nativas por Biomas

**Mata Atlântica** ⭐ foco inicial — Manacá-da-serra (*Tibouchina mutabilis*), Quaresmeira (*Tibouchina granulosa*), Jerivá (*Syagrus romanzoffiana*), Bromélia-imperial, Orquídea-bambu, Helicônia, Alpínia

**Cerrado** — Sempre-viva, Pé-de-moça, Barbatimão, Buriti, Pequi, Arnica

**Amazônia** — Orquídeas (Cattleya, Laelia), Bromélias (Aechmea, Vriesea), Açaí ornamental

**Caatinga** — Mandacaru, Xique-xique, Coroa-de-frade, Pau-ferro florido, Alecrim-da-caatinga

**Pampa** — Verbena, Margarida, Araçá, Guabiroba, Iris, Taboa

**Pantanal** — Vitória-régia, Aguapé, Acuri, Bocaiúva, Ipê-amarelo, Taboa

### Vasos Diversificados

| Categoria     | Exemplos                               |
| ------------- | -------------------------------------- |
| Cerâmica      | Vaso português, barro queimado         |
| Concreto      | Minimalista, industrial                |
| Fibra natural | Palha, bambu, sisal                    |
| Suspensos     | Macramê, cachepot de parede            |
| Reciclados    | Lata, vidro, pneu (upcycling)          |
| Premium       | Cobre, pedra-sabão, madeira nobre      |

---

## 🌐 Domínio

| Domínio         | Status           | Preço      |
| --------------- | ---------------- | ---------- |
| `flor.ai`       | ⚠️ Caro/indisponível | $50-200/ano |
| `florai.com.br` | ❌ Indisponível   | —          |
| `florai.app`    | ✅ **Recomendado** | ~$20/ano  |

---

## 🛠️ Stack Técnica

| Camada       | Tecnologia                              |
| ------------ | --------------------------------------- |
| Build        | Vite 5                                  |
| UI           | React 18 + TypeScript                   |
| Canvas       | Konva.js + react-konva                  |
| Estilos      | Tailwind CSS 3                          |
| Backend/Auth | Supabase (PostgreSQL + Storage + Auth)  |
| Deploy       | Vercel                                  |
| Analytics    | Plausible (privacy-first)               |

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "konva": "^9.3.1",
    "react-konva": "^18.2.10",
    "use-image": "^1.1.1"
  }
}
```

---

## 📅 Roadmap MVP

| Semana | Entrega                                                 |
| ------ | ------------------------------------------------------- |
| 1-2    | Setup Vite + React + Tailwind. Estrutura biomas/espécies |
| 3-4    | Drag-and-drop funcional. 5-10 vasos. Export PNG         |
| 5-6    | Galeria/Mural público. Share link. Mobile responsivo    |
| 7-8    | Deploy Vercel. Domínio florai.app. Divulgação Instagram |

---

## 💰 Modelo de Receita

| Plano           | Preço            | Features                                         |
| --------------- | ---------------- | ------------------------------------------------ |
| Grátis          | R$ 0             | 3 biomas, 50 plantas, 5 vasos, PNG c/ watermark  |
| Premium         | R$ 19,90/mês     | 6 biomas, 200+ plantas, 30+ vasos, sem watermark |
| Profissional    | R$ 99/mês        | PDF, white-label, lead capture                   |

---

## 🎨 Design

**Paleta:** `#2D6A4F` Verde floresta · `#D8F3DC` Verde claro · `#E07A5F` Terracota · `#F7F9F7` Off-white

**Tipografia:** Playfair Display (títulos) + Inter/Sora (corpo)

---

## 🎯 Diferenciais — Oceano Azul

| Característica | Flority     | FLOR.AI              |
| -------------- | ----------- | -------------------- |
| Espécies       | Genéricas   | Nativas brasileiras  |
| Contexto       | Nenhum      | Educação botânica    |
| Foco           | Buquês      | Arranjos + paisagismo|
| Identidade     | Global      | 100% Brasil          |
| Monetização    | Nenhuma     | Freemium claro       |

---

## 📊 Métricas de Sucesso (3 meses)

| Métrica             | Meta    |
| ------------------- | ------- |
| Usuários únicos/mês | 1.000+  |
| Arranjos criados    | 5.000+  |
| Compartilhamentos   | 500+    |
| Conversão Premium   | 3-5%    |
| Leads paisagismo    | 10-20   |

---

## 👥 Equipe

| Nome       | Papel                                              |
| ---------- | -------------------------------------------------- |
| **Danilo** | Paisagismo, curadoria de nativas, visão            |
| **Maria**  | Secretária, organização, gamificação, documentação |

---

## 💚 Filosofia

> "Um bom jardim funciona com beleza, organização e plantas que contam histórias."

*Le jardin est numérique, mais les racines sont brésiliennes.* 🌿
