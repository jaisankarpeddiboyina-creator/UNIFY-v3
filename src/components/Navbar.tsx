import { Search } from 'lucide-react';
import { useSearch } from '../hooks/useSearch';
import { Link } from 'react-router-dom';

export function Navbar() {
  const { query, category, updateSearch } = useSearch();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearch(e.target.value, category);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <div style={{ padding: '6px', background: 'var(--color-accent)', borderRadius: '8px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Search size={20} strokeWidth={3} />
        </div>
        <span>UNIFY</span>
      </Link>
      <div className="search-container">
        <input 
          type="text" 
          className="search-input" 
          placeholder={`Search ${category || 'everything'}...`} 
          value={query}
          onChange={handleSearchChange}
          style={{ paddingLeft: '44px', background: '#F1F5F9', border: 'none', borderRadius: '14px' }}
        />
        <div style={{ position: 'absolute', left: '16px', top: '12px', color: '#64748B' }}>
          <Search size={18} />
        </div>
      </div>
    </nav>
  );
}
