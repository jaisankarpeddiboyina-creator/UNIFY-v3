// Import extractors (to be created in subsequent steps)
// To maintain token limits, only Crypto is fully implemented. Others use stubs.

import { extractCrypto } from "../extractors/cryptoExtractor.js";
import { extractArticles } from "../extractors/articlesExtractor.js";
import { extractNews } from "../extractors/newsExtractor.js";
import { extractPhotos } from "../extractors/photosExtractor.js";
import { extractGeneric } from "../extractors/genericExtractor.js";
import { extractBooks } from "../extractors/booksExtractor.js";
import { extractAnime } from "../extractors/animeExtractor.js";
import { extractMusic } from "../extractors/musicExtractor.js";
import { extractVideoTv } from "../extractors/videoTvExtractor.js";

const extractors = {
  cryptocurrency: extractCrypto,
  articles: extractArticles,
  news: extractNews,
  social: extractNews,
  photos: extractPhotos,
  books: extractBooks,
  anime: extractAnime,
  music: extractMusic,
  tv_video: extractVideoTv,
  ai_images: extractGeneric,
  animals: extractGeneric,
  games_comics: extractGeneric,
  sports: extractGeneric,
  humor: extractGeneric,
  science: extractGeneric,
  space: extractGeneric,
  government: extractGeneric,
  maps: extractGeneric,
  transportation: extractGeneric,
  finance: extractGeneric,
  food_drink: extractGeneric,
  health: extractGeneric,
  art: extractGeneric,
  environment: extractGeneric,
  quotes: extractGeneric,
  entertainment: extractGeneric,
  development: extractGeneric,
  history: extractGeneric,
  language: extractGeneric,
  jobs: extractGeneric,
  security: extractGeneric,
  calendar: extractGeneric,
  open_data: extractGeneric,
  education: extractGeneric
};

export function extractResults(categoryName, apiName, rawData) {
  try {
    // If rawData is already a result (from fetcher handling images)
    if (rawData && rawData.isUnified) return [rawData];

    const extractor = extractors[categoryName] || extractGeneric;
    return extractor(rawData, apiName, categoryName);
  } catch (err) {
    console.log(`[EXTRACT FAIL] ${apiName}: ${err.message}`);
    return [];
  }
}
