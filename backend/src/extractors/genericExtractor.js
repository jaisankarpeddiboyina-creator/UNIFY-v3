import crypto from 'crypto';

export function extractGeneric(data, apiName, categoryName) {
  if (!data) return [];

  let items = [];
  
  // Recursive search for the "best" array in the response
  const findBestArray = (obj, depth = 0) => {
    if (depth > 5 || !obj) return null;
    
    if (Array.isArray(obj) && obj.length > 0) {
      // Check if this array looks like useful data (list of objects)
      const firstItem = obj[0];
      if (typeof firstItem === 'object' && firstItem !== null) {
        const keys = Object.keys(firstItem);
        // Does it have common data keys?
        const hasDataKeys = keys.some(k => ['title', 'name', 'id', 'text', 'url'].includes(k.toLowerCase()));
        if (hasDataKeys) return obj;
      }
      return obj; // Fallback to first found array
    }

    if (typeof obj === 'object' && obj !== null) {
      let best = null;
      for (const key in obj) {
        const found = findBestArray(obj[key], depth + 1);
        if (found) {
          // Prefer deeper arrays that look like data
          if (!best || (Array.isArray(found) && found.length > (best?.length || 0))) {
            best = found;
          }
        }
      }
      return best;
    }
    return null;
  };

  const foundArray = findBestArray(data);
  if (foundArray) {
    items = foundArray;
  } else if (typeof data === 'object') {
    items = [data]; // Wrap single object
  }

  return items.slice(0, 50).map(item => {
    if (!item || typeof item !== 'object') {
      return {
        id: crypto.randomUUID(),
        title: String(item),
        source: apiName,
        category: categoryName,
        timestamp: new Date().toISOString()
      };
    }

    // Smart field resolver to find data in nested structures
    const resolve = (obj, fields) => {
      if (!obj) return null;
      // Check top level
      for (const field of fields) {
        if (obj[field] && typeof obj[field] !== 'object') return obj[field];
      }
      // Check first level sub-objects or arrays
      for (const key in obj) {
        const val = obj[key];
        if (val && typeof val === 'object') {
          const sub = Array.isArray(val) ? val[0] : val;
          if (!sub) continue;
          for (const field of fields) {
            if (sub[field] && typeof sub[field] !== 'object') return sub[field];
          }
        }
      }
      return null;
    };

    // Comprehensive heuristic for finding important fields
    let title = resolve(item, ['name', 'title', 'artist_name', 'track_name', 'label', 'heading', 'subject', 'display_name', 'header', 'full_name', 'text', 'id', 'symbol', 'slug']) || 
                item.text?.slice(0, 50) || 
                (typeof item === 'object' && Object.values(item).find(v => typeof v === 'string' && v.length > 2 && v.length < 100)) ||
                'Result';
    
    let description = resolve(item, ['description', 'summary', 'extract', 'overview', 'bio', 'content', 'snippet', 'caption', 'about', 'desc', 'text', 'body', 'synopsis', 'disambiguation']);
    
    let url = resolve(item, ['url', 'link', 'href', 'external_url', 'website', 'source_url']);

    let imageUrl = resolve(item, ['thumbnail', 'image', 'thumb', 'thumb_large', 'cover', 'photo', 'poster', 'banner', 'icon', 'artwork', 'imageUrl', 'image_url', 'picture', 'logo', 'avatar_url', 'href']);

    // Dedicated check for NASA format (links[0].href usually has the image)
    if (!imageUrl && Array.isArray(item.links)) {
      imageUrl = item.links[0]?.href;
    }
    if (!description && Array.isArray(item.data)) {
      description = item.data[0]?.description || item.data[0]?.summary;
      if (!title || title === 'Untitled Result') title = item.data[0]?.title;
    }

    // If item itself is a URL (common in simple image APIs)
    if (typeof item === 'string' && (item.startsWith('http') || item.includes('/'))) {
      imageUrl = item;
      url = item;
      title = `Result from ${apiName}`;
    }

    return {
      id: crypto.randomUUID(),
      title: String(title).slice(0, 500),
      description: description ? String(description).replace(/<[^>]*>/g, '').slice(0, 5000) : null,
      source: apiName,
      category: categoryName,
      url: url,
      imageUrl: imageUrl,
      timestamp: new Date().toISOString(),
      metadata: { original: item }
    };
  });
}
