import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('cat') || 'articles';
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const performSearch = useCallback(async (q, cat, pageNum = 1, append = false, signal?: AbortSignal) => {
    if (pageNum === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    setError(null);

    try {
      const qParam = q ? encodeURIComponent(q) : '';
      const response = await fetch(`/api/search?category=${encodeURIComponent(cat)}&q=${qParam}&page=${pageNum}`, { signal });
      const data = await response.json();
      
      if (response.ok) {
        const newResults = data.results || [];
        if (append) {
          setResults(prev => {
            const combined = [...prev, ...newResults];
            const seen = new Set();
            return combined.filter(item => {
              // Try multiple identifying fields
              const id = item.id || item.imageUrl || item.url || item.title || JSON.stringify(item);
              if (seen.has(id)) return false;
              seen.add(id);
              return true;
            });
          });
        } else {
          setResults(newResults);
        }
        
        // Only set hasMore to false if we literally get 0 results
        if (newResults.length === 0) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } else {
        setError(data.error || 'Search failed');
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        // Silently handle component unmount/new request
        return;
      }
      setError(`Search Error: ${err instanceof Error ? err.message : String(err)}`);
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  const [prevQuery, setPrevQuery] = useState(query);
  const [prevCategory, setPrevCategory] = useState(category);

  useEffect(() => {
    setPage(1);
    setHasMore(true);

    const controller = new AbortController();
    
    // If category changed but query didn't, or query is empty -> IMMEDIATE
    // If query changed -> DEBOUNCE (typing)
    const isCategorySwitch = category !== prevCategory && query === prevQuery;
    const isInitial = query === '' && category === 'articles';
    const delay = (isCategorySwitch || query === '' || isInitial) ? 0 : 300; 

    const timer = setTimeout(() => {
      performSearch(query, category, 1, false, controller.signal);
      setPrevQuery(query);
      setPrevCategory(category);
    }, delay);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, category, performSearch]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    performSearch(query, category, nextPage, true);
  };

  const updateSearch = (q, cat) => {
    const params = {};
    if (q) params.q = q;
    if (cat) params.cat = cat;
    setSearchParams(params);
  };

  return { results, loading, loadingMore, error, query, category, updateSearch, loadMore, hasMore };
}
