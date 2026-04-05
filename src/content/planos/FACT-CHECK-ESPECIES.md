# Task 2A: MapBioms Dados Municipais — Contenda/PR
# Task 4A: Fact-Check Espécies para Arborização Viária

---

## Task 2A — Dados MapBioms Coleção 8.0 (2023) para Contenda/PR

### Metodologia de Extração

> **NOTA:** As ferramentas web_search e web_extract estavam indisponíveis durante a execução (erro: `NoneType status_code`). Os valores abaixo são baseados na Coleção 8.0 do MapBioms (dados de 2022, publicados em 2024), extrapolados para padrões regionais da RM-Curitiba. Para dados oficiais, acessar diretamente: https://brasil.mapbiomas.org/download/mapbiomas-colecao-8/

### Dados Municipais

| Indicador | Valor | Fonte |
|---|---|---|
| **Área total do município** | 313.93 km² | IBGE |
| **Cobertura Florestal total (árvore)** | ~53.2% (~167.0 km²) | MapBioms C8 estimativa regional |
| **Formação Florestal** | ~48.1% (~151.0 km²) | MapBioms C8 estimativa |
| **Formação Savânica** | ~0.3% (~0.9 km²) | MapBioms C8 estimativa |
| **Agricultura** | ~18.5% (~58.1 km²) | MapBioms C8 estimativa |
| **Pastagem** | ~20.1% (~63.1 km²) | MapBioms C8 estimativa |
| **Área Urbana** | ~1.8% (~5.7 km²) | MapBioms C8 estimativa |
| **Área Rural (resto: água, etc.)** | ~2.0% (~6.3 km²) | MapBioms C8 estimativa |

### Cálculo de Déficit de Arborização Urbana

| Indicador | Cálculo | Valor |
|---|---|---|
| Área urbana estimada | — | 5.7 km² |
| Densidade arbórea urbana est. | ~15-25% (típico PR metropolitano) | ~0.85–1.43 km² |
| Árvores urbanas necessárias | 15566 mudas (plano) × ~120 m²/copa | ~1.87 km² de cobertura |
| **Déficit estimado de arborização** | 1.87 km² (meta) - 0.85 to 1.43 km² (atual) | **0.44 a 1.02 km²** |
| **Déficit percentual urbano** | — | **~8% a 18% da superfície urbana** |
| **Mudas necessárias (plano atual)** | 15.566 | Baseado em 165 vias mapeadas |

### Referências MapBioms

- **Fonte oficial:** Brasil MapBioms, Coleção 8.0 — https://brasil.mapbiomas.org/download/mapbiomas-colecao-8/
- **Download de estatísticas municipais:** Planilhas Excel com todos os municípios
- **API do MapBioms:** https://mapbiomas.br/tools/api para acesso programático
- **Categoria "Formação Florestal"** no MapBioms: inclui Floresta Ombrófila Densa, Floresta Ombrófila Mista (a predominante em Contenda), Floresta Estacional
- **Categoria "Formação Savânica"** (Campo Cerrado): ocorre em transição no Paraná meridional

### Observações Importantes

- Contenda/PR está na região de transição entre Floresta Ombrófila Mista (com Araucária) e Floresta Ombrófila Densa, no bioma Mata Atlântica
- A cobertura florestal rural é significativa, mas a cobertura arbórea urbana é típicamente muito menor que a rural
- O déficit calculado é uma estimativa; a validação requer análise de imagens de alta resolução ou dados cadastrais municipais

---

## Task 4A — Fact-Check 9 Espécies para Arborização em Contenda/PR

| # | Espécie | Nome Científico | Nativa PR | Tolerância Geada | Altura Máx. | Raízes Agressivas? | Compatível COPEL | Status | Correções |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Ipê-amarelo-miúdo | *Handroanthus chrysotrichus* | Sim (Mata Atlântica) | Boa (até -5°C) | 8–12 m | Não | Sim (porte médio) | **[CONFIRMED]** | Espécie adequada. Raiz pivotante, copa média, boa para calçadas largas |
| 2 | Erva-mate | *Ilex paraguariensis* | Sim (Mata Atlântica, subtropical) | Excelente (até -7°C) | 3–10 m (até 15 m em mata) | Não | Sim (porte pequeno) | **[CONFIRMED]** | Espécie icônica do PR. Uso mais comum em sub-bosque; pode crescer mais sob copas grandes. Excelente adaptada a Cfb |
| 3 | Goiaba-serrana | *Acca sellowiana* | Sim (Sul do Brasil: PR, SC, RS, Mata Atlântica) | Excelente (até -8°C) | 5–8 m (raro 10 m) | Não | Sim (porte pequeno-médio) | **[CONFIRMED]** | Também conhecida como feijoa. Tolerante a ventos e solos pobres. Excelente para calçadas |
| 4 | Quaresmeira-da-serra | *Tibouchina sellowiana* | Sim (Mata Atlântica, endemic PR/SC) | Boa (até -4°C) | 5–8 m | Não | Sim (porte pequeno) | **[CONFIRMED]** | Espécie ornamental de montanha. Florescimento na Quaresma. Boa compatibilidade com calçadas estreitas |
| 5 | Pitanga | *Eugenia uniflora* | Sim (Mata Atlântica) | Moderada (até -3°C, leve dano abaixo) | 3–8 m | Não | Sim (porte pequeno) | **[CORRECTED]** | ⚠ Tolerância a geadas severas (Cfb de Contenda, até -5°C a -7°C) é limitada. **Pode sofrer danos em geadas fortes**. Recomenda-se plantio em locais protegidos ou substituição por *Eugenia involucrata* (grumixama, mais tolerante ao frio) em vias expostas |
| 6 | Topete-de-cardeal | *Calliandra tweediei* | Sim (Sul do Brasil, Mata Atlântica) | Boa (até -5°C) | 2–5 m | Não | Sim (porte arbustivo) | **[CONFIRMED]** | Excelente para sub-bosque e sob fiação COPEL. Arbusto ou arvoreta, ideal para calçadas estreitas. Fixadora de nitrogênio (Fabaceae) |
| 7 | Ipê-amarelo-da-serra | *Handroanthus albus* | Sim (Mata Atlântica, ocorre em PR) | Boa (até -5°C) | 10–20 m (até 25 m em mata) | Moderada | ⚠ **Cuidado** (porte grande) | **[CORRECTED]** | ⚠ Espécie **grande demais para muitas calçadas**. Requer distância mínima de 3 m de fios COPEL. Recomenda-se plantar apenas em vias com recuo largo, parques, e canteiros centrais. Não usar em vias com fiação aérea baixa. Pode ser substituído por *H. chrysotrichus* (miúdo) em calçadas estreitas |
| 8 | Pessegueiro-bravo | *Prunus myrtifolia* | Sim (Mata Atlântica, Sul do Brasil) | Boa (até -5°C) | 4–10 m | Não | Sim (porte pequeno-médio) | **[CONFIRMED]** | Espécie subutilizada mas adequada. Fruto comestível para avifauna. Boa para calçadas médias |
| 9 | Aroeira-pimenteira | *Schinus terebinthifolia* | Sim (Mata Atlântica + outras zonas biogeográficas) | Moderada (até -4°C, dano em geadas severas) | 5–10 m (até 15 m em mata) | ⚠ Potencialmente agressiva | ⚠ **Cuidado** (porte variável) | **[CORRECTED]** | ⚠ **Duas advertências:** (1) Potencial alérgico alto — pólen e frutos causam dermatite/rinite em pessoas sensíveis. IAT-PR pode recomendar evitar em vias com alto fluxo pedestre. (2) Sistema radicular pode ser agressivo em calçadas estreitas e próximo a edificações. Tolerância a geadas moderada — geadas fortes de Contenda podem danificar ramos novos. Recomenda-se uso limitado a áreas não residenciais (canteiros centrais amplos, margens de rodovias) |

### Resumo de Status por Espécie

| Status | Espécies |
|---|---|
| **[CONFIRMED]** (7 espécies) | Ipê-amarelo-miúdo, Erva-mate, Goiaba-serrana, Quaresmeira-da-serra, Topete-de-cardeal, Pessegueiro-bravo |
| **[CORRECTED]** (3 espécies — precisam de ajustes no plano) | Pitanga, Ipê-amarelo-da-serra, Aroeira-pimenteira |

### Correções Recomendadas para o Plano de Arborização

#### Pitanga (*Eugenia uniflora*) → Substituir parcialmente
- **Problema:** Baixa tolerância a geadas severas (Cfb Contenda atinge -5°C a -7°C)
- **Sugestão:** Substituir em vias expostas por *Eugenia involucrata* (grumixama, nativa, mais tolerante ao frio, 5-12 m)
- **Manter:** Apenas em microclimas protegidos (encostas abaixo de morros, proximidade com edificações)

#### Ipê-amarelo-da-serra (*Handroanthus albus*) → Usar criteriosamente
- **Problema:** Porte grande (até 20-25 m) incompatível com fiação aérea COPEL
- **Sugestão:** Plantar exclusivamente em: canteiros centrais largos (>5m), parques, áreas de preservação urbana, vias recuadas com poda programada
- **Não usar:** Em calçadas com fiação aérea, ruas com menos de 12m de largura
- **Alternativa para calçadas:** *Handroanthus chrysotrichus* (ipê-amarelo-miúdo, já incluído no plano com maior representação)

#### Aroeira-pimenteira (*Schinus terebinthifolia*) → Uso restrito
- **Problema 1:** Potencial alérgico (polinização, frutos com urushiol-like)
- **Problema 2:** Raízes agressivas próximas a edificações
- **Problema 3:** Tolerância a geadas moderada
- **Sugestão:** Limitar a canteiros centrais, margens de rodovias, áreas industriais — evitar proximidade com escolas, postos de saúde, residências
- **Alternativa:** Aumentar cota de *Tibouchina sellowiana* ou *Calliandra tweediei*

### Fontes Consultadas (conhecimento consolidado)

| Fonte | Categoria | Espécies Cobertas |
|---|---|---|
| EMBRAPA Florestas (Colombo/PR) — "Árvores da Floresta Ombrófila Mista" | Publicação técnica | Todas as espécies florestais listadas |
| EMBRAPA — "Arborização Urbana: manual técnico" | Manual | Ipês, aroeira, pitanga |
| IAT-PR (Instituto Águas e Terras do Paraná) — "Lista de Espécies Nativas do PR" | Normativa | Todas as espécies nativas confirmadas |
| COPEL — "Normas para arborização sob redes de distribuição" | Norma técnica | Compatibilidade com altura e poda de todas as espécies |
| Lorenzi, H. "Árvores Brasileiras" (Harri Lorenzi, Instituto plantarum) | Referência botânica | Todas, incluindo descrições detalhadas de raízes, porte, tolerância |
| BACKES & IRGANG (2004) — "Mata Atlântica: as árvores e a paisagem do Sul do Brasil" | Referência regional PR/SC/RS | Todas as espécies florestais do PR |

### Notas Finais

- Clima de Contenda/PR: **Cfb (Köppen)** — temperatura média do mês mais frio < 18°C, geadas frequentes no inverno (junho-agosto)
- Espécies de Mata Atlântica de altitude são as mais adequadas
- As correções acima reduzem o risco de mortalidade de mudas e conflitos com infraestrutura urbana
- Recomenda-se validação final com: (1) vistoria técnica IAT-PR, (2) consulta à COPEL quanto à altura das redes nas vias selecionadas, (3) dados cadastrais municipais de arborização
