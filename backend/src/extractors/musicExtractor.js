import crypto from 'crypto';
import { extractGeneric } from './genericExtractor.js';

export function extractMusic(data, apiName) {
  if (apiName === 'MusicBrainz') {
    if (!data?.artists || !Array.isArray(data.artists)) return [];
    return data.artists.map(artist => ({
      id: crypto.randomUUID(),
      title: artist.name,
      description: `Country: ${artist.country || 'N/A'} | Type: ${artist.type || 'N/A'} | ${artist.disambiguation || ''}`,
      source: 'MusicBrainz',
      category: 'music',
      url: `https://musicbrainz.org/artist/${artist.id}`,
      imageUrl: null,
      timestamp: new Date().toISOString(),
      metadata: { area: artist.area?.name }
    }));
  }
  
  return extractGeneric(data, apiName, 'music');
}
