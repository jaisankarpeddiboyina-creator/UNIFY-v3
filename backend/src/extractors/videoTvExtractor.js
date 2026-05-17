import crypto from 'crypto';
import { extractGeneric } from './genericExtractor.js';

export function extractVideoTv(data, apiName) {
  if (apiName === 'TVMaze') {
    if (!Array.isArray(data)) return [];
    return data.map(item => {
      const show = item.show;
      if (!show) return null;
      return {
        id: crypto.randomUUID(),
        title: show.name,
        description: show.summary ? show.summary.replace(/<[^>]*>/g, '') : 'No description.',
        source: 'TVMaze',
        category: 'tv_video',
        url: show.url,
        imageUrl: show.image?.medium || show.image?.original,
        timestamp: new Date().toISOString(),
        metadata: { rating: show.rating?.average, status: show.status }
      };
    }).filter(Boolean);
  }
  
  return extractGeneric(data, apiName, 'tv_video');
}
