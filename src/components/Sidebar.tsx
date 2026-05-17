import { useState, useEffect } from 'react';
import { useSearch } from '../hooks/useSearch';
import { 
  FileText, Bitcoin, Rocket, Globe, Music, Camera, ShoppingBag, 
  HelpCircle, Database, Cpu, Zap, Heart, Layout
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, any> = {
  articles: FileText,
  crypto: Bitcoin,
  space: Rocket,
  environment: Globe,
  music: Music,
  photos: Camera,
  shopping: ShoppingBag,
  tech: Cpu,
  health: Heart,
  finance: Zap,
  social: Database,
};

export function Sidebar() {
  const [categories, setCategories] = useState([]);
  const { category: activeCategory, query, updateSearch } = useSearch();

  useEffect(() => {
    fetch('/api/categories')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch categories');
        return res.json();
      })
      .then(data => {
        if (data && Array.isArray(data.categories)) {
          setCategories(data.categories);
        }
      })
      .catch(err => {
        console.error('Sidebar category fetch error:', err);
      });
  }, []);

  const handleCategoryClick = (catName: string) => {
    updateSearch(query, catName);
  };

  if (!Array.isArray(categories)) return <aside className="sidebar" />;

  return (
    <aside className="sidebar">
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {categories.map((cat: any) => {
          const Icon = CATEGORY_ICONS[cat?.name] || Layout;
          return (
            <button
              key={cat?.name || Math.random()}
              className={`sidebar-item ${activeCategory === cat?.name ? 'active' : ''}`}
              onClick={() => cat?.name && handleCategoryClick(cat.name)}
            >
              <Icon size={18} className="meta-icon" />
              <span className="sidebar-text">{cat?.displayName || cat?.name || 'Unknown'}</span>
            </button>
          );
        })}
      </div>
      <div style={{ padding: '20px', borderTop: '1px solid var(--color-border)', fontSize: '11px', color: '#94A3B8', textAlign: 'center', fontWeight: '500' }}>
        1,294+ APIs Connected
      </div>
    </aside>
  );
}
