import { useSearch } from '../hooks/useSearch';
import { CardRenderer } from '../components/CardRenderer';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { RefreshCcw } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  const { results, loading, loadingMore, error, query, category, updateSearch, loadMore, hasMore } = useSearch();

  // Still show welcome if no results and no loading and no query
  if (!query && (results || []).length === 0 && !loading) {
    return (
      <div style={{ maxWidth: '800px', margin: '140px auto 0', textAlign: 'center' }}>
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 style={{ 
            fontFamily: 'var(--font-family-heading)',
            fontSize: '72px', 
            fontWeight: 800, 
            marginBottom: '24px',
            background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-3px'
          }}>UNIFY</h1>
          <p style={{ 
            color: '#64748B', 
            fontSize: '22px', 
            lineHeight: 1.6,
            marginBottom: '48px',
            fontWeight: 500
          }}>
            The universal data aggregator. <br/>
            Instant access to <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>1,294+ APIs</span> across 35 categories. No Auth. No Hassle.
          </p>
        </motion.div>

        <motion.div 
          style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {['Articles', 'Crypto', 'Space', 'Environment'].map((tag) => (
            <button 
              key={tag}
              onClick={() => updateSearch('', tag.toLowerCase())}
              style={{ 
                padding: '12px 24px', 
                borderRadius: '50px', 
                border: '1px solid var(--color-border)',
                background: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                color: '#64748B',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-accent)';
                e.currentTarget.style.color = 'var(--color-accent)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.color = '#64748B';
              }}
            >
              Explore {tag}
            </button>
          ))}
        </motion.div>
      </div>
    );
  }

  const handleRefresh = () => {
    updateSearch(query, category); // Re-trigger search
  };

  const sourcesUsed = Array.from(new Set((results || []).filter(r => r && r.source).map(r => r.source)));

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '600' }}>Results for "{query || category}"</h2>
          {(sourcesUsed || []).length > 0 && (
            <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
              Aggregated from: <span style={{ color: '#2D5A8C', fontWeight: '500' }}>{sourcesUsed.join(', ')}</span>
            </div>
          )}
          {error && <div style={{ color: 'red', marginTop: '8px' }}>{error}</div>}
        </div>
        <button 
          onClick={handleRefresh}
          className="btn-icon"
          title="Get fresh results"
          style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', whiteSpace: 'nowrap' }}
        >
          <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {loading && (results || []).length === 0 ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="results-grid">
            {(results || []).filter(Boolean).map((res: any, idx: number) => (
              <CardRenderer key={res?.id || `res-${idx}`} result={res} index={idx} />
            ))}
          </div>
          {hasMore && (
            <div style={{ textAlign: 'center', margin: '40px 0' }}>
              <button 
                onClick={loadMore} 
                disabled={loadingMore}
                className="btn-primary" 
                style={{ padding: '12px 32px', fontSize: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                {loadingMore && <RefreshCcw size={16} className="animate-spin" />}
                {loadingMore ? 'Fetching More...' : 'Show More Results'}
              </button>
            </div>
          )}
        </>
      )}

      {!loading && (results || []).length === 0 && !error && query && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ textAlign: 'center', marginTop: '80px', padding: '40px' }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
          <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text)' }}>No results for "{query}"</h3>
          <p style={{ color: '#64748B', marginTop: '8px' }}>We couldn't find anything matching your search in the {category} category.</p>
          <button 
            onClick={() => updateSearch('', category)}
            style={{ 
              marginTop: '24px', 
              color: 'var(--color-accent)', 
              fontWeight: 600, 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Clear Search
          </button>
        </motion.div>
      )}
    </div>
  );
}
