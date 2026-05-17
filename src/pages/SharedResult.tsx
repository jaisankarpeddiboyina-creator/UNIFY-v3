import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CardRenderer } from '../components/CardRenderer';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ArrowLeft } from 'lucide-react';

export default function SharedResult() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/share/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.result) {
          setResult(data.result);
        } else {
          setError('Shared result has expired or does not exist.');
        }
      })
      .catch(() => setError('Failed to load shared result.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', color: '#2D5A8C', textDecoration: 'none', fontWeight: '500' }}>
        <ArrowLeft size={16} /> Back to UNIFY
      </Link>
      
      {error ? (
        <div style={{ textAlign: 'center', color: '#666', padding: '40px' }}>{error}</div>
      ) : (
        <CardRenderer result={result} />
      )}
    </div>
  );
}
