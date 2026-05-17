import crypto from 'crypto';

function normalizeResult(partial) {
  return {
    id: crypto.randomUUID(),
    title: partial.title || 'Unknown',
    description: partial.description || null,
    source: partial.source,
    category: 'cryptocurrency',
    url: partial.url || null,
    imageUrl: partial.imageUrl || null,
    timestamp: new Date().toISOString(),
    metadata: partial.metadata || {}
  };
}

export function extractCrypto(data, apiName) {
  if (apiName === 'CoinGecko') {
    if (!data?.coins) return [];
    return data.coins.map(coin => normalizeResult({
      title: `${coin.name} (${coin.symbol?.toUpperCase()})`,
      description: `Market Cap Rank: ${coin.market_cap_rank || 'N/A'}`,
      source: 'CoinGecko',
      url: `https://www.coingecko.com/en/coins/${coin.id}`,
      imageUrl: coin.thumb || null,
      metadata: { id: coin.id, symbol: coin.symbol }
    }));
  }

  if (apiName === 'CoinCap') {
    if (!data?.data) return [];
    return data.data.map(asset => normalizeResult({
      title: `${asset.name} (${asset.symbol})`,
      description: `Price: $${parseFloat(asset.priceUsd).toFixed(4)} | Change 24h: ${parseFloat(asset.changePercent24Hr).toFixed(2)}%`,
      source: 'CoinCap',
      url: `https://coincap.io/assets/${asset.id}`,
      imageUrl: null,
      metadata: { rank: asset.rank, priceUsd: asset.priceUsd }
    }));
  }

  return [];
}
