import crypto from 'crypto';
import { extractGeneric } from './genericExtractor.js';

export function extractArticles(data, apiName) {
  if (apiName === 'Wikipedia' || apiName === 'Wikiquote' || apiName === 'Wiktionary') {
    if (!Array.isArray(data) || data.length < 4) return [];
    const [, titles, descriptions, urls] = data;
    return titles.map((title, i) => ({
      id: crypto.randomUUID(),
      title: title,
      description: descriptions[i] || '',
      source: apiName,
      category: 'articles',
      url: urls[i],
      imageUrl: null,
      timestamp: new Date().toISOString(),
      metadata: {}
    }));
  }
  
  return extractGeneric(data, apiName, 'articles');
}
