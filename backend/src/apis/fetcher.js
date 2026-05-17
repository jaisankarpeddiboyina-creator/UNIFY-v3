const TIMEOUT_MS = 8000;
import crypto from 'crypto';

async function fetchAPIs(categoryName, query, registry, page = 1) {
  const selectedAPIs = selectAPIs(categoryName, registry, query);
  
  const fetchPromises = selectedAPIs.map(async (api) => {
    const url = buildURL(api, query, page);
    try {
      const data = await fetchWithTimeout(url, TIMEOUT_MS, query);
      return { apiName: api.name, status: 'fulfilled', data };
    } catch (err) {
      console.log(`[FAIL] ${api.name}: ${err.message}`);
      return { apiName: api.name, status: 'rejected', data: null };
    }
  });
  
  return await Promise.all(fetchPromises);
}

async function fetchWithTimeout(url, timeoutMs = TIMEOUT_MS, query = '') {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { 
      signal: controller.signal,
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*'
      }
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.log(`[HTTP ERROR] ${url}: ${response.status}`);
      throw new Error(`HTTP ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    
    // Handle Images (Pollinations, Picsum, etc)
    if (contentType?.includes('image/')) {
      const cleanQuery = query.charAt(0).toUpperCase() + query.slice(1);
      return {
        isUnified: true,
        id: crypto.randomUUID(),
        title: query ? `${cleanQuery} (Image)` : 'Visual Asset',
        description: 'Asset from ' + new URL(url).hostname,
        source: new URL(url).hostname,
        imageUrl: url,
        url: url,
        timestamp: new Date().toISOString()
      };
    }

    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      // If it's valid text but not JSON, wrap it
      if (text.length > 5) {
        return [{ text: text.slice(0, 500) }];
      }
      throw e;
    }
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

function selectAPIs(categoryName, registry, query = '') {
  const allAPIs = registry.filter(a => a.category === categoryName);
  
  // Increase limit to 15 for more consistent results
  const LIMIT = 15;
  
  if (allAPIs.length <= LIMIT) return allAPIs;

  // Use the query to create a stable "random" seed
  let hash = 0;
  const seedString = (query || categoryName).toLowerCase();
  for (let i = 0; i < seedString.length; i++) {
    hash = ((hash << 5) - hash) + seedString.charCodeAt(i);
    hash |= 0; 
  }
  
  const pseudoRandom = () => {
    hash = Math.sin(hash++) * 10000;
    return hash - Math.floor(hash);
  };

  // Include ALL high-quality known APIs for this category
  const knownAPIs = allAPIs.filter(a => a.isKnown === true);
  
  let selection = [...knownAPIs];

  const remainingPool = allAPIs.filter(a => !selection.find(s => s.name === a.name));
  const shuffled = remainingPool.sort(() => pseudoRandom() - 0.5);
  
  // Fill the rest up to LIMIT
  return [...selection, ...shuffled.slice(0, LIMIT - selection.length)];
}

function buildURL(api, query, page = 1) {
  const endpoint = api.searchEndpoint || '';
  // Incorporate page into seed so "random" APIs return DIFFERENT results per page
  const seed = Math.floor(Math.random() * 100) + (page * 7); 
  const offset = (page - 1) * 10;
  
  let url = api.baseUrl + endpoint;
  url = url.replace('{query}', encodeURIComponent(query || api.category));
  url = url.replace('{seed}', seed.toString());
  url = url.replace('{page}', page.toString());
  url = url.replace('{offset}', offset.toString());

  // Automatic pagination detection
  if (page > 1 && !endpoint.includes('{page}') && !endpoint.includes('{offset}') && !endpoint.includes('{seed}')) {
    const separator = url.includes('?') ? '&' : '?';
    if (api.baseUrl.includes('google') || api.name.includes('Google')) {
      url += `${separator}startIndex=${offset}`;
    } else if (api.baseUrl.includes('wp-json') || api.name.toLowerCase().includes('news')) {
      url += `${separator}page=${page}`;
    } else if (api.baseUrl.includes('api.github.com')) {
      url += `${separator}page=${page}&per_page=10`;
    } else if (api.category === 'photos' || api.category === 'ai_images') {
      // For images, force the seed if it wasn't there
      url += `${separator}page=${page}&seed=${seed}`;
    } else {
      // General fallbacks
      const isOffsetBased = api.description?.toLowerCase().includes('limit') || api.name.toLowerCase().includes('data');
      url += isOffsetBased ? `${separator}offset=${offset}` : `${separator}page=${page}`;
    }
  }

  // Add cache buster for non-strict APIs
  const strictAPIs = ['nasa.gov', 'api.openverse.engineering'];
  const isStrict = strictAPIs.some(domain => url.includes(domain));

  if (!isStrict) {
    const separator = url.includes('?') ? '&' : '?';
    url += `${separator}_cb=${Date.now()}`;
  }
  
  return url;
}

export { fetchAPIs, selectAPIs };
