import express from 'express';
import { getShareCache, setShareCache } from '../middleware/cache.js';

const router = express.Router();

router.post('/', (req, res) => {
  const { result } = req.body;
  if (!result) return res.status(400).json({ error: 'No result provided' });

  const shareId = setShareCache(result);
  const shareUrl = `${req.protocol}://${req.get('host')}/share?id=${shareId}`;
  
  res.json({ id: shareId, shareUrl });
});

router.get('/:id', (req, res) => {
  const result = getShareCache(req.params.id);
  if (!result) return res.status(404).json({ error: 'Not found' });
  res.json({ result });
});

export default router;
