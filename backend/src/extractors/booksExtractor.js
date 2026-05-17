import crypto from 'crypto';
import { extractGeneric } from './genericExtractor.js';

export function extractBooks(data, apiName) {
  if (apiName === 'Open Library') {
    if (!data?.docs || !Array.isArray(data.docs)) return [];
    return data.docs.map(book => ({
      id: crypto.randomUUID(),
      title: book.title,
      description: `Author: ${book.author_name?.join(', ') || 'Unknown'} | First Published: ${book.first_publish_year || 'N/A'}`,
      source: 'Open Library',
      category: 'books',
      url: `https://openlibrary.org${book.key}`,
      imageUrl: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null,
      timestamp: new Date().toISOString(),
      metadata: { isbn: book.isbn?.[0] }
    }));
  }
  
  return extractGeneric(data, apiName, 'books');
}
