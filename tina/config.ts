import { defineConfig } from "tinacms";

const clientId = process.env.TINA_CLIENT_ID || "67f5d55d-8f76-409e-8524-7bce3d5bc084";
const token = process.env.TINA_TOKEN || null;

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || "main",
  clientId: clientId,
  token: token,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "assets",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "municipio",
        label: "10 - Município",
        path: "src/content/municipio",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Título", isTitle: true, required: true },
          { type: "string", name: "slug", label: "Slug", required: true },
          { type: "string", name: "status", label: "Status", options: ["rascunho", "revisado", "publicavel"] },
          { type: "string", name: "source_url", label: "URL da Fonte" },
          { type: "string", name: "source_org", label: "Órgão Responsável" },
          { type: "number", name: "confidence", label: "Confiança (0.0 a 1.0)" },
          { type: "datetime", name: "collected_at", label: "Data de Coleta" },
          { type: "rich-text", name: "body", label: "Conteúdo", isBody: true },
        ],
      },
      {
        name: "temas",
        label: "20 - Temas (Arborização, etc)",
        path: "src/content/temas",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Título", isTitle: true, required: true },
          { type: "string", name: "theme", label: "Tema", options: ["arborizacao", "clima", "floresta", "leis", "car", "pib", "saf", "leite-premium"] },
          { type: "string", name: "source_url", label: "URL da Fonte" },
          { type: "string", name: "source_org", label: "Órgão Responsável" },
          { type: "number", name: "confidence", label: "Nível de Confiança (0.0 a 1.0)" },
          { type: "datetime", name: "collected_at", label: "Data de Coleta" },
          { type: "boolean", name: "public", label: "Público?" },
          { type: "rich-text", name: "body", label: "Conteúdo Editorial", isBody: true },
        ],
      },
      {
        name: "planos",
        label: "30 - Planos de Gestão",
        path: "src/content/planos",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Título do Plano", isTitle: true, required: true },
          { type: "string", name: "tipo", label: "Tipo", options: ["arborizacao", "saf", "car-rl", "pmau", "irrigacao", "manejo"] },
          { type: "string", name: "municipio", label: "Município", required: true },
          { type: "string", name: "status", label: "Status", options: ["preliminar", "em-validacao", "aprovado", "em-execucao"] },
          { type: "string", name: "source_url", label: "URL do GeoJSON" },
          { type: "number", name: "total_vias", label: "Total de Vias" },
          { type: "number", name: "total_mudas", label: "Total de Mudas Previstas" },
          { type: "number", name: "custo_estimado", label: "Custo Total (R$)" },
          { type: "string", name: "especies", label: "Espécies Utilizadas (separadas por vírgula)" },
          { type: "string", name: "source_org", label: "Órgão Responsável" },
          { type: "number", name: "confidence", label: "Confiança (0.0 a 1.0)" },
          { type: "datetime", name: "collected_at", label: "Data de Coleta" },
          { type: "boolean", name: "public", label: "Público?" },
          { type: "rich-text", name: "body", label: "Descrição Técnica do Plano", isBody: true },
        ],
      },
      {
        name: "dossies",
        label: "50 - Dossiês",
        path: "src/content/dossies",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Título do Dossiê", isTitle: true, required: true },
          { type: "string", name: "evidence_level", label: "Nível de Evidência" },
          { type: "string", name: "source_url", label: "URL da Fonte" },
          { type: "string", name: "source_org", label: "Órgão Responsável" },
          { type: "number", name: "confidence", label: "Confiança (0.0 a 1.0)" },
          { type: "datetime", name: "collected_at", label: "Data de Coleta" },
          { type: "rich-text", name: "body", label: "Análise Técnica", isBody: true },
        ],
      },
      {
        name: "projetos",
        label: "60 - Projetos",
        path: "src/content/projetos",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Nome do Projeto", isTitle: true, required: true },
          { type: "string", name: "slug", label: "Slug", required: true },
          { type: "string", name: "status", label: "Status", options: ["planejamento", "mvp", "beta", "producao", "pausado"] },
          { type: "string", name: "dominio", label: "Domínio Alvo" },
          { type: "string", name: "stack", label: "Stack Técnica" },
          { type: "string", name: "mvp_prazo", label: "Prazo MVP" },
          { type: "datetime", name: "created_at", label: "Data de Criação" },
          { type: "boolean", name: "public", label: "Público?" },
          { type: "rich-text", name: "body", label: "Documentação", isBody: true },
        ],
      },
    ],
  },
});
