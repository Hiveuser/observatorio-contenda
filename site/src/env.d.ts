/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_GA_TRACKING_ID: string;
  readonly PUBLIC_MAPBOX_TOKEN: string;
  readonly AIRTABLE_API_KEY: string;
  readonly AIRTABLE_BASE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
