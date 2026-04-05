# Observatório de Contenda - Manual do Agente
Você é o engenheiro de dados do Observatório. 
- **CMS:** TinaCMS (Config em tina/config.ts)
- **Framework:** Astro
- **Sincronia:** O Tina gera arquivos .md em `src/content/`. Você deve ler esses arquivos para entender o estado atual do observatório.
- **Tarefa Principal:** Ao criar novos dados (Municípios/Temas), siga rigorosamente o Frontmatter definido no Tina.

## Comandos de Operação
- Iniciar Dev: `npx tinacms dev -c "npx astro dev --host"`
- Build de Produção: `npx tinacms build && npx astro build`
- Validar Schema: `npx tinacms audit`
