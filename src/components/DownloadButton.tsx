import { Download, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { downloadJSON, downloadCSV, downloadTXT } from '../utils/download';

export function DownloadButton({ result }: { result: any }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDownload = (type: string) => {
    if (type === 'json') downloadJSON(result);
    if (type === 'csv') downloadCSV(result);
    if (type === 'txt') downloadTXT(result);
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <button className="btn-icon" onClick={() => setIsOpen(!isOpen)}>
        <Download size={16} />
      </button>
      {isOpen && (
        <div style={{
          position: 'absolute',
          bottom: 'calc(100% + 8px)',
          right: 0,
          background: 'white',
          border: '1px solid var(--color-border)',
          borderRadius: '12px',
          padding: '4px',
          zIndex: 10,
          boxShadow: '0 10px 40px -10px rgba(0,0,0,0.2)',
          minWidth: '100px',
          overflow: 'hidden'
        }}>
          <button 
            style={{ display: 'block', width: '100%', padding: '10px 16px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: '#475569' }} 
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F1F5F9'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            onClick={() => handleDownload('json')}
          >
            JSON
          </button>
          <button 
            style={{ display: 'block', width: '100%', padding: '10px 16px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: '#475569' }} 
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F1F5F9'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            onClick={() => handleDownload('csv')}
          >
            CSV
          </button>
          <button 
            style={{ display: 'block', width: '100%', padding: '10px 16px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: '#475569' }} 
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F1F5F9'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            onClick={() => handleDownload('txt')}
          >
            Text
          </button>
        </div>
      )}
    </div>
  );
}
