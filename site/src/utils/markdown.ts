/**
 * Dados de notas do vault.
 * Importa o JSON gerado pelo prebuild.mjs (roda antes do `astro build`).
 * Evita tree-shaking do Rollup/Vite porque e apenas um import estatico.
 */

import notesData from '../data/notes.json';

export interface NoteFrontmatter {
  titulo: string;
  tipo: string;
  status: string;
  criado_em: string;
  atualizado_em: string;
  spatial_status?: string;
  lat?: number;
  lon?: number;
  geom_type?: string;
  crs?: string;
  geocode_confidence?: number;
  geocode_source?: string;
  admin_country?: string;
  admin_state?: string;
  admin_municipality?: string;
  tags?: string[];
  aliases?: string[];
  canonical_name?: string;
  entity_type?: string;
  entity_id?: string;
  geojson_ref?: string;
  resumo?: string;
  [key: string]: unknown;
}

export interface VaultNote {
  slug: string;
  filepath: string;
  frontmatter: NoteFrontmatter;
  content: string;
  html: string;
}

const notes: VaultNote[] = notesData as unknown as VaultNote[];

export function getAllNotes(): VaultNote[] {
  return notes;
}

export function getNotesByType(tipo: string): VaultNote[] {
  return notes.filter(n => n.frontmatter.tipo === tipo);
}

export function getNotesByTag(tag: string): VaultNote[] {
  return notes.filter(n =>
    Array.isArray(n.frontmatter.tags) && n.frontmatter.tags.includes(tag)
  );
}

export function getGeoNotes(): VaultNote[] {
  return notes.filter(n =>
    n.frontmatter.spatial_status === 'georreferenciado' &&
    typeof n.frontmatter.lat === 'number' &&
    typeof n.frontmatter.lon === 'number'
  );
}

export function getThemes(): { slug: string; name: string; count: number }[] {
  const tagMap = new Map<string, number>();
  for (const n of notes) {
    if (Array.isArray(n.frontmatter.tags)) {
      for (const t of n.frontmatter.tags) {
        tagMap.set(t, (tagMap.get(t) || 0) + 1);
      }
    }
  }
  return Array.from(tagMap.entries()).map(([tag, count]) => ({
    slug: tag,
    name: tag.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    count,
  })).sort((a, b) => b.count - a.count);
}

export function getNoteBySlug(slug: string): VaultNote | null {
  return notes.find(n => n.slug === slug) ?? null;
}