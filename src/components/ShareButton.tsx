import { Share2 } from 'lucide-react';
import { useState } from 'react';
import { shareToWhatsApp, shareToTwitter, copyToClipboard } from '../utils/share';

export function ShareButton({ result }: { result: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async (type: string) => {
    try {
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ result })
      });
      const { shareUrl } = await response.json();

      if (type === 'whatsapp') shareToWhatsApp(result.title, shareUrl);
      if (type === 'twitter') shareToTwitter(result.title, shareUrl);
      if (type === 'copy') {
        const success = await copyToClipboard(shareUrl);
        if (success) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      }
      setIsOpen(false);
    } catch (err) {
      console.error('Share failed', err);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <button className="btn-icon" onClick={() => setIsOpen(!isOpen)}>
        <Share2 size={16} />
      </button>
      {isOpen && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          right: 0,
          background: 'white',
          border: '1px solid #ddd',
          borderRadius: '4px',
          padding: '4px',
          zIndex: 10,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <button style={{ display: 'block', width: '100%', padding: '8px 12px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left' }} onClick={() => handleShare('copy')}>{copied ? 'Copied!' : 'Copy Link'}</button>
          <button style={{ display: 'block', width: '100%', padding: '8px 12px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left' }} onClick={() => handleShare('whatsapp')}>WhatsApp</button>
          <button style={{ display: 'block', width: '100%', padding: '8px 12px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left' }} onClick={() => handleShare('twitter')}>Twitter</button>
        </div>
      )}
    </div>
  );
}
