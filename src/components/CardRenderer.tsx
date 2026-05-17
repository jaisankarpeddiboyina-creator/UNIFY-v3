import { DownloadButton } from './DownloadButton';
import { ShareButton } from './ShareButton';
import { ExternalLink, Calendar, Image as ImageIcon } from 'lucide-react';
import { formatDate } from '../utils/formatters';
import { motion } from 'motion/react';

export function CardRenderer({ result, index }: { result: any; index: number }) {
  if (!result) return null;

  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: Math.min(index * 0.05, 0.5),
        ease: [0.23, 1, 0.32, 1]
      }}
      whileHover={{ y: -4, boxShadow: '0 12px 24px -10px rgba(0,0,0,0.15)' }}
    >
      <div className="card-top">
        <div className="card-title" title={result.title}>{result.title || 'Untitled Result'}</div>
        <span className="source-badge">{result.source || 'Unknown'}</span>
      </div>

      {result.imageUrl ? (
        <div className="card-image-container">
          <img 
            src={result.imageUrl} 
            alt={result.title || 'Image'} 
            loading="lazy" 
            className="card-image"
            onError={(e) => {
              e.currentTarget.parentElement!.style.display = 'none';
            }}
          />
        </div>
      ) : null}

      <div className="card-desc">
        {result.description ? 
          (result.description.length > 200 ? result.description.slice(0, 200) + '...' : result.description) 
          : 'No description provided for this entry.'}
      </div>

      <div className="card-footer">
        <div className="card-timestamp">
          {result.timestamp ? (
            <>
              <Calendar size={12} className="meta-icon" />
              {formatDate(result.timestamp)}
            </>
          ) : null}
        </div>
        
        <div className="card-actions">
          <DownloadButton result={result} />
          <ShareButton result={result} />
          {result.url && (
            <a href={result.url} target="_blank" rel="noopener noreferrer" className="btn-icon" title="View Source">
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
