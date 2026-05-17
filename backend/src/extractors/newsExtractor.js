import crypto from 'crypto';
import { extractGeneric } from './genericExtractor.js';

export function extractNews(data, apiName) {
  // Handle Algolia (search) format
  if (data?.hits && Array.isArray(data.hits)) {
    return data.hits.map(hit => ({
      id: crypto.randomUUID(),
      title: hit.title || hit.story_title || 'Untitled',
      description: `Author: ${hit.author || 'unknown'} | Points: ${hit.points || 0}`,
      source: apiName,
      category: 'news',
      url: hit.url || (hit.objectID ? `https://news.ycombinator.com/item?id=${hit.objectID}` : null),
      imageUrl: null,
      timestamp: hit.created_at ? new Date(hit.created_at).toISOString() : new Date().toISOString(),
      metadata: { author: hit.author, points: hit.points }
    }));
  }
  
  return extractGeneric(data, apiName, 'news');
}
