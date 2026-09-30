import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'dicolbis',
  dataset: 'production',
  apiVersion: '2024-03-07',
  useCdn: false, // Set to true for production to use edge cache
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export function getLocaleContent(obj: any, lang: 'en' | 'ar') {
  if (!obj) return null;
  return obj[lang] || obj['en'] || obj['ar'] || null;
}

