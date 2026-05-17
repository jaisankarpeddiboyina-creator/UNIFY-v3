import express from 'express';
import { fetchAPIs } from '../apis/fetcher.js';
import { extractResults } from '../apis/extractor.js';
import { API_REGISTRY } from '../config/apiRegistry.js';
import { getCategoryDefault } from '../config/categoryDefaults.js';
import { getSearchCache, setSearchCache } from '../middleware/cache.js';
import { apiRateLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

router.get('/', apiRateLimiter, async (req, res) => {
  const { category, q, page } = req.query;
  const pageNum = parseInt(page) || 1;

  if (!category) {
    return res.status(400).json({ error: 'Missing category parameter' });
  }

  // Default query if empty
  const isDefaultFetch = !q || typeof q !== 'string' || q.trim() === '';
  const searchQ = isDefaultFetch ? getCategoryDefault(category) : q;

  // Check cache (include page in key)
  const cached = getSearchCache(category, `${searchQ}_p${pageNum}`);
  if (cached) {
    return res.json({ 
      results: cached, 
      total: cached.length, 
      category, 
      query: q || "", 
      page: pageNum,
      fromCache: true 
    });
  }

  try {
    console.log(`[SEARCH] cat=${category} q=${searchQ} p=${pageNum} default=${isDefaultFetch}`);
    const rawResults = await fetchAPIs(category, searchQ, API_REGISTRY, pageNum);
    
    let allUnifiedResults = [];
    for (const result of rawResults) {
      if (result.status === 'fulfilled') {
        const extracted = extractResults(category, result.apiName, result.data);
        allUnifiedResults = [...allUnifiedResults, ...extracted];
      }
    }

    // Deduplicate or sort if needed
    setSearchCache(category, `${searchQ}_p${pageNum}`, allUnifiedResults);

    res.json({
      results: allUnifiedResults,
      total: allUnifiedResults.length,
      category,
      query: q || "",
      page: pageNum,
      fromCache: false
    });
  } catch (err) {
    console.error('Search route error:', err);
    res.status(500).json({ error: 'Failed to process search' });
  }
});

export default router;
