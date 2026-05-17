import crypto from 'crypto';

const searchCache = new Map();
const shareCache = new Map();

const SEARCH_TTL = 5 * 60 * 1000;   // 5 minutes
const SHARE_TTL = 24 * 60 * 60 * 1000;  // 24 hours

export function getSearchCache(category, query) {
  const key = `${category}:${query.toLowerCase().trim()}`;
  const cached = searchCache.get(key);
  if (cached && Date.now() < cached.expiry) return cached.results;
  searchCache.delete(key);
  return null;
}

export function setSearchCache(category, query, results) {
  const key = `${category}:${query.toLowerCase().trim()}`;
  searchCache.set(key, { results, expiry: Date.now() + SEARCH_TTL });
}

export function getShareCache(id) {
  const cached = shareCache.get(id);
  if (cached && Date.now() < cached.expiry) return cached.result;
  shareCache.delete(id);
  return null;
}

export function setShareCache(result) {
  const id = crypto.randomUUID();
  shareCache.set(id, { result, expiry: Date.now() + SHARE_TTL });
  return id;
}
