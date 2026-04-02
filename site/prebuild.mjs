/**
 * Pre-build: le arquivos .md do vault e gera src/data/notes.json.
 * Roda antes do `astro build` para que os dados estejam disponiveis
 * como um import estatico (sem tree-shaking do Rollup).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { marked } from 'marked';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_DIR = __dirname;
const DATA_DIR = path.join(SITE_DIR, 'src', 'data');

// Resolve onde esta o vault (mesma logica de getVaultPath)
function resolveVault() {
  // 1. Env var
  if (process.env.VAULT_PATH) {
    const p = path.resolve(process.env.VAULT_PATH);
    if (fs.existsSync(p)) return p;
  }
  // 2. _vault inside site/ (copiado pelo vercel.json buildCommand)
  const inSite = path.join(SITE_DIR, '_vault');
  if (fs.existsSync(inSite)) return inSite;
  // 3. ../vault (dev local)
  const parent = path.resolve(SITE_DIR, '..', 'vault');
  if (fs.existsSync(parent)) return parent;
  // 4. ./vault (cwd = repo root)
  const root = path.resolve(process.cwd(), 'vault');
  if (fs.existsSync(root)) return root;
  return inSite; // fallback
}

function collectMarkdownFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectMarkdownFiles(full));
    } else if (entry.name.endsWith('.md') && entry.name !== '.gitkeep') {
      results.push(full);
    }
  }
  return results;
}

function parseNote(filepath) {
  try {
    const raw = fs.readFileSync(filepath, 'utf-8');
    const { data, content } = matter(raw);
    if (!data.titulo || !data.tipo) return null;
    const slug = path.basename(filepath, '.md');
    const html = marked.parse(content, { async: false });
    return { slug, filepath, frontmatter: data, content, html };
  } catch (err) {
    console.warn(`[prebuild] Erro ao parsear ${filepath}:`, err.message);
    return null;
  }
}

// Main
const vaultPath = resolveVault();
console.log(`[prebuild] Vault: ${vaultPath}`);

if (!fs.existsSync(vaultPath)) {
  console.error(`[prebuild] ERRO: Vault nao encontrado em ${vaultPath}`);
  process.exit(1);
}

const dirs = fs.readdirSync(vaultPath, { withFileTypes: true })
  .filter(d => d.isDirectory() && !d.name.startsWith('00_'));
console.log(`[prebuild] Diretorios: ${dirs.map(d => d.name).join(', ')}`);

const notes = [];
for (const dir of dirs) {
  const files = collectMarkdownFiles(path.join(vaultPath, dir.name));
  for (const f of files) {
    const note = parseNote(f);
    if (note) notes.push(note);
  }
}

notes.sort((a, b) => a.frontmatter.titulo.localeCompare(b.frontmatter.titulo));

// Garantir que o diretorio data existe
fs.mkdirSync(DATA_DIR, { recursive: true });

const outFile = path.join(DATA_DIR, 'notes.json');
fs.writeFileSync(outFile, JSON.stringify(notes, null, 2), 'utf-8');
console.log(`[prebuild] ${notes.length} notas geradas em ${path.relative(SITE_DIR, outFile)}`);