import crypto from 'crypto';
import { extractGeneric } from './genericExtractor.js';

export function extractAnime(data, apiName) {
  if (apiName === 'Jikan') {
    if (!data?.data || !Array.isArray(data.data)) return [];
    return data.data.map(anime => ({
      id: crypto.randomUUID(),
      title: anime.title,
      description: anime.synopsis ? anime.synopsis : 'No synopsis available.',
      source: 'Jikan (MAL)',
      category: 'anime',
      url: anime.url,
      imageUrl: anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url,
      timestamp: new Date().toISOString(),
      metadata: { rating: anime.score, type: anime.type }
    }));
  }
  
  return extractGeneric(data, apiName, 'anime');
}
