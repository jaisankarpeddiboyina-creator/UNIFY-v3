export const CATEGORY_DEFAULTS = {
  articles: ["featured", "history", "biography", "science", "culture"],
  news: ["trending", "breaking", "latest", "world", "technology"],
  photos: ["nature", "architecture", "travel", "landscape", "portrait", "ocean"],
  ai_images: ["cyberpunk", "surreal", "futuristic", "abstract", "cosmic"],
  books: ["popular", "best sellers", "classics", "mystery", "biography"],
  anime: ["top", "trending", "seasonal", "classic", "shonen"],
  animals: ["wildlife", "ocean life", "domestic animals", "birds", "nature"],
  music: ["trending", "hits", "jazz", "electronic", "classical"],
  cryptocurrency: ["market", "bitcoin", "ethereum", "defi", "nft"],
  weather: ["London", "New York", "Tokyo", "Paris", "Sydney"],
  tv_video: ["popular", "trending", "critics choice", "classic tv"],
  games_comics: ["gaming", "retro", "esports", "manga", "comics"],
  sports: ["latest", "highlights", "scores", "championship", "athletes"],
  humor: ["funny", "memes", "comedy", "jokes", "parody"],
  science: ["discovery", "research", "evolution", "astronomy", "physics"],
  space: ["universe", "galaxy", "nasa", "spacex", "mars"],
  government: ["news", "policy", "international", "democracy"],
  maps: ["landmarks", "cities", "regions", "mountains"],
  transportation: ["modern", "aviation", "trains", "automotive", "future"],
  finance: ["stocks", "market news", "economy", "investing"],
  food_drink: ["recipes", "gourmet", "street food", "pastry", "drinks"],
  health: ["wellbeing", "fitness", "nutrition", "mental health", "medical"],
  art: ["museum", "modern art", "renaissance", "sculpture", "digital art"],
  environment: ["sustainability", "climate", "conservation", "green energy"],
  quotes: ["inspiration", "wisdom", "success", "life", "philosophical"],
  entertainment: ["cinema", "theatre", "celebrity", "red carpet", "festivals"],
  development: ["javascript", "ai", "web3", "cloud", "rust"],
  history: ["world", "ancient", "medieval", "modern", "warfare"],
  language: ["vocabulary", "linguistics", "etymology", "translation"],
  jobs: ["remote", "tech", "design", "marketing", "freelance"],
  security: ["cyber", "privacy", "blockchain", "hacker", "pentest"],
  social: ["trends", "viral", "community", "influencer"],
  calendar: ["holidays", "month", "events", "time"],
  open_data: ["statistics", "census", "demographics", "economics"],
  education: ["online courses", "university", "learning", "skills"]
};

export const getCategoryDefault = (category) => {
  const defaults = CATEGORY_DEFAULTS[category];
  if (Array.isArray(defaults)) {
    // Basic pseudo-randomness or just random
    return defaults[Math.floor(Math.random() * defaults.length)];
  }
  return defaults || category;
};
