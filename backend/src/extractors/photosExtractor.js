import crypto from 'crypto';
import { extractGeneric } from './genericExtractor.js';

export function extractPhotos(data, apiName) {
  if (apiName === 'Picsum Photos') {
    if (!Array.isArray(data)) return [];
    return data.map(item => ({
      id: crypto.randomUUID(),
      title: `Photo by ${item.author}`,
      description: `Original size: ${item.width}x${item.height}`,
      source: 'Picsum Photos',
      category: 'photos',
      url: item.url,
      imageUrl: item.download_url,
      timestamp: new Date().toISOString(),
      metadata: { author: item.author }
    }));
  }

  if (apiName === 'Wikipedia Images') {
    const pages = data?.query?.pages;
    if (!pages) return [];
    return Object.values(pages).map(page => ({
      id: crypto.randomUUID(),
      title: page.title,
      description: 'Image from Wikipedia Commons',
      source: 'Wikipedia',
      category: 'photos',
      url: `https://en.wikipedia.org/?curid=${page.pageid}`,
      imageUrl: page.thumbnail?.source || (page.imageinfo ? page.imageinfo[0].url : null),
      timestamp: new Date().toISOString(),
      metadata: { pageid: page.pageid }
    })).filter(p => p.imageUrl);
  }

  if (apiName === 'Openverse') {
    const results = data?.results;
    if (!Array.isArray(results)) return [];
    return results.map(item => ({
      id: crypto.randomUUID(),
      title: item.title || 'Creative Commons Photo',
      description: `Author: ${item.creator || 'Unknown'}. Provider: ${item.provider}`,
      source: 'Openverse',
      category: 'photos',
      url: item.foreign_landing_url,
      imageUrl: item.url,
      timestamp: new Date().toISOString()
    })).filter(p => p.imageUrl);
  }

  if (apiName === 'Flickr Feed') {
    const items = data?.items;
    if (!Array.isArray(items)) return [];
    return items.map(item => ({
      id: crypto.randomUUID(),
      title: item.title || 'Flickr Photo',
      description: item.description ? String(item.description).replace(/<[^>]*>/g, '').slice(0, 500) : null,
      source: 'Flickr',
      category: 'photos',
      url: item.link,
      imageUrl: item.media?.m,
      timestamp: new Date().toISOString()
    })).filter(p => p.imageUrl);
  }

  if (apiName === 'NASA Image Video Library') {
    const items = data?.collection?.items;
    if (!Array.isArray(items)) return [];
    return items.map(item => {
      const dataObj = item.data?.[0] || {};
      const links = item.links || [];
      const imgLink = links.find(l => l.rel === 'preview' || l.render === 'image');
      return {
        id: crypto.randomUUID(),
        title: dataObj.title || 'NASA Image',
        description: dataObj.description || dataObj.secondary_creator,
        source: 'NASA',
        category: 'photos',
        url: `https://images.nasa.gov/details-${dataObj.nasa_id}`,
        imageUrl: imgLink?.href,
        timestamp: dataObj.date_created || new Date().toISOString()
      };
    }).filter(p => p.imageUrl);
  }
  
  // Fallback to generic for Lorem Flickr, Unsplash, etc.
  const generic = extractGeneric(data, apiName, 'photos');
  return generic.filter(item => item.imageUrl);
}
