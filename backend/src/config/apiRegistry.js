export const API_REGISTRY = [
  // ARTICLES
  {
    name: "Wikipedia",
    category: "articles",
    baseUrl: "https://en.wikipedia.org/w/api.php",
    searchEndpoint: "?action=opensearch&search={query}&limit=100&format=json&origin=*",
    isKnown: true,
    auth: "No",
    description: "Universal encyclopedia"
  },
  {
    name: "Wikiquote",
    category: "articles",
    baseUrl: "https://en.wikiquote.org/w/api.php",
    searchEndpoint: "?action=opensearch&search={query}&limit=50&format=json&origin=*",
    isKnown: false,
    auth: "No"
  },
  {
    name: "Wiktionary",
    category: "articles",
    baseUrl: "https://en.wiktionary.org/w/api.php",
    searchEndpoint: "?action=opensearch&search={query}&limit=50&format=json&origin=*",
    isKnown: false,
    auth: "No"
  },
  {
    name: "Open Library Search",
    category: "articles",
    baseUrl: "https://openlibrary.org",
    searchEndpoint: "/search.json?q={query}&limit=10",
    isKnown: false,
    auth: "No"
  },
  {
    name: "Project Gutenberg",
    category: "articles",
    baseUrl: "https://gutendex.com",
    searchEndpoint: "/books?search={query}",
    isKnown: false,
    auth: "No"
  },
  // NEWS
  {
    name: "HackerNews Search",
    category: "news",
    baseUrl: "https://hn.algolia.com/api/v1",
    searchEndpoint: "/search?query={query}&hitsPerPage=50",
    isKnown: true,
    auth: "No",
    description: "Tech and developer news"
  },
  {
    name: "Reddit News",
    category: "news",
    baseUrl: "https://www.reddit.com",
    searchEndpoint: "/r/news/search.json?q={query}&restrict_sr=on&limit=100",
    isKnown: false,
    auth: "No"
  },
  {
    name: "SpaceFlight News",
    category: "news",
    baseUrl: "https://api.spaceflightnewsapi.net/v4",
    searchEndpoint: "/articles/?search={query}&limit=100",
    isKnown: false,
    auth: "No"
  },
  {
    name: "The Guardian (Guest)",
    category: "news",
    baseUrl: "https://content.guardianapis.com",
    searchEndpoint: "/search?q={query}&api-key=test&page-size=50",
    isKnown: false,
    auth: "No"
  },
  {
    name: "NewsAPI Proxy",
    category: "news",
    baseUrl: "https://newsapi.org/v2",
    searchEndpoint: "/everything?q={query}&pageSize=50",
    isKnown: false,
    auth: "No"
  },
  // PHOTOS
  {
    name: "Lorem Flickr",
    category: "photos",
    baseUrl: "https://loremflickr.com",
    searchEndpoint: "/800/600/{query}",
    isKnown: false,
    auth: "No",
    description: "Keyword-based random photos"
  },
  {
    name: "Wikipedia Images",
    category: "photos",
    baseUrl: "https://en.wikipedia.org/w/api.php",
    searchEndpoint: "?action=query&prop=pageimages|imageinfo&iiprop=url&pithumbsize=800&generator=search&gsrsearch=filetype:bitmap|drawing%20{query}&gsrlimit=50&format=json&origin=*",
    isKnown: true,
    auth: "No",
    description: "Images from Wikipedia Commons"
  },
  {
    name: "NASA Image Video Library",
    category: "photos",
    baseUrl: "https://images-api.nasa.gov",
    searchEndpoint: "/search?q={query}&media_type=image",
    isKnown: true,
    auth: "No",
    description: "NASA's space image archive"
  },
  {
    name: "Picsum Photos",
    category: "photos",
    baseUrl: "https://picsum.photos/v2",
    searchEndpoint: "/list?limit=100",
    isKnown: true,
    auth: "No",
    description: "High quality photography"
  },
  {
    name: "Flickr Feed",
    category: "photos",
    baseUrl: "https://www.flickr.com/services/feeds/photos_public.gne",
    searchEndpoint: "?tags={query}&format=json&nojsoncallback=1",
    isKnown: true,
    auth: "No"
  },
  {
    name: "Robohash",
    category: "photos",
    baseUrl: "https://robohash.org",
    searchEndpoint: "/{query}?set=set{seed}&page={page}",
    isKnown: false,
    auth: "No"
  },
  {
    name: "DiceBear Art",
    category: "photos",
    baseUrl: "https://api.dicebear.com/7.x/pixel-art/svg",
    searchEndpoint: "?seed={query}-{page}-{seed}",
    isKnown: false,
    auth: "No"
  },
  // AI IMAGES
  {
    name: "Pollinations AI",
    category: "ai_images",
    baseUrl: "https://image.pollinations.ai",
    searchEndpoint: "/prompt/{query}-{seed}?width=512&height=512&nologo=true",
    isKnown: true,
    auth: "No",
    description: "AI-generated images for any prompt"
  },
  {
    name: "Stable Diffusion Web",
    category: "ai_images",
    baseUrl: "https://api.stability.ai/v1/generation", // Placeholder for logic
    searchEndpoint: "/text-to-image",
    isKnown: false,
    auth: "No"
  },
  {
    name: "AI Placeholder",
    category: "ai_images",
    baseUrl: "https://api.dicebear.com/7.x/bottts/svg",
    searchEndpoint: "?seed={query}-{page}-{seed}",
    isKnown: false,
    auth: "No"
  },
  // BOOKS
  {
    name: "Open Library",
    category: "books",
    baseUrl: "https://openlibrary.org",
    searchEndpoint: "/search.json?q={query}&limit=50",
    isKnown: true,
    auth: "No",
    description: "Open book catalog"
  },
  {
    name: "Google Books (Public)",
    category: "books",
    baseUrl: "https://www.googleapis.com/books/v1",
    searchEndpoint: "/volumes?q={query}&maxResults=10",
    isKnown: false,
    auth: "No"
  },
  {
    name: "IT Books",
    category: "books",
    baseUrl: "https://api.itbook.store/1.0",
    searchEndpoint: "/search/{query}",
    isKnown: false,
    auth: "No"
  },
  {
    name: "New York Times Books",
    category: "books",
    baseUrl: "https://api.nytimes.com/svc/books/v3",
    searchEndpoint: "/lists/best-sellers/history.json?api-key=test",
    isKnown: false,
    auth: "No"
  },
  {
    name: "Library of Congress",
    category: "books",
    baseUrl: "https://www.loc.gov",
    searchEndpoint: "/search/?q={query}&fo=json",
    isKnown: false,
    auth: "No"
  },
  // ANIME
  {
    name: "Jikan",
    category: "anime",
    baseUrl: "https://api.jikan.moe/v4",
    searchEndpoint: "/anime?q={query}&limit=25",
    isKnown: true,
    auth: "No",
    description: "The most active anime and manga database"
  },
  // ANIMALS
  {
    name: "Wikipedia Animals",
    category: "animals",
    baseUrl: "https://en.wikipedia.org/w/api.php",
    searchEndpoint: "?action=opensearch&search={query}&limit=30&format=json&origin=*",
    isKnown: true,
    auth: "No",
    description: "Scientific animal data"
  },
  {
    name: "Cat Facts",
    category: "animals",
    baseUrl: "https://catfact.ninja",
    searchEndpoint: "/facts?limit=50",
    isKnown: true,
    auth: "No",
    description: "Random cat facts"
  },
  {
    name: "Dog Facts",
    category: "animals",
    baseUrl: "https://dogapi.dog/api/v2",
    searchEndpoint: "/facts?limit=20",
    isKnown: false,
    auth: "No"
  },
  {
    name: "Animal Image Placeholder",
    category: "animals",
    baseUrl: "https://placeimg.com/640/480/animals",
    searchEndpoint: "?{seed}",
    isKnown: false,
    auth: "No"
  },
  {
    name: "RescueGroups",
    category: "animals",
    baseUrl: "https://api.rescuegroups.org/v5",
    searchEndpoint: "/public/animals/search?limit=20",
    isKnown: false,
    auth: "No"
  },
  // MUSIC
  {
    name: "MusicBrainz",
    category: "music",
    baseUrl: "https://musicbrainz.org/ws/2",
    searchEndpoint: "/artist/?query={query}&fmt=json&limit=100",
    isKnown: true,
    auth: "No",
    description: "Open music encyclopedia"
  },
  {
    name: "iTunes Search",
    category: "music",
    baseUrl: "https://itunes.apple.com",
    searchEndpoint: "/search?term={query}&limit=10&media=music",
    isKnown: false,
    auth: "No"
  },
  {
    name: "Deezer Public",
    category: "music",
    baseUrl: "https://api.deezer.com",
    searchEndpoint: "/search?q={query}",
    isKnown: false,
    auth: "No"
  },
  {
    name: "Lyrics.ovh",
    category: "music",
    baseUrl: "https://api.lyrics.ovh/v1",
    searchEndpoint: "/{query}",
    isKnown: false,
    auth: "No"
  },
  {
    name: "AudioDB",
    category: "music",
    baseUrl: "https://www.theaudiodb.com/api/v1/json/1",
    searchEndpoint: "/search.php?s={query}",
    isKnown: false,
    auth: "No"
  },
  // CRYPTOCURRENCY
  {
    name: "CoinGecko",
    category: "cryptocurrency",
    baseUrl: "https://api.coingecko.com/api/v3",
    searchEndpoint: "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100",
    isKnown: true,
    auth: "No",
    description: "Cryptocurrency market data"
  },
  {
    name: "Coinbase",
    category: "cryptocurrency",
    baseUrl: "https://api.exchange.coinbase.com",
    searchEndpoint: "/products",
    isKnown: true,
    auth: "No",
    description: "Real-time cryptocurrency exchange data"
  },
  {
    name: "Coinlore Tickers",
    category: "cryptocurrency",
    baseUrl: "https://api.coinlore.net/api",
    searchEndpoint: "/tickers/",
    isKnown: false,
    auth: "No"
  },
  {
    name: "Blockchain.info",
    category: "cryptocurrency",
    baseUrl: "https://blockchain.info",
    searchEndpoint: "/rawaddr/{query}",
    isKnown: false,
    auth: "No"
  },
  {
    name: "Coinranking",
    category: "cryptocurrency",
    baseUrl: "https://api.coinranking.com/v2",
    searchEndpoint: "/coins?search={query}",
    isKnown: false,
    auth: "No"
  },
  // WEATHER
  {
    name: "Open-Meteo",
    category: "weather",
    baseUrl: "https://api.open-meteo.com/v1",
    searchEndpoint: "/forecast?latitude=52.52&longitude=13.41&current_weather=true", 
    isKnown: true,
    auth: "No",
    description: "Free and open weather API"
  },
  {
    name: "Wttr.in",
    category: "weather",
    baseUrl: "https://wttr.in",
    searchEndpoint: "/{query}?format=j1",
    isKnown: false,
    auth: "No"
  },
  {
    name: "7Timer!",
    category: "weather",
    baseUrl: "http://www.7timer.info",
    searchEndpoint: "/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=json",
    isKnown: false,
    auth: "No"
  },
  {
    name: "MeteoSource",
    category: "weather",
    baseUrl: "https://www.meteosource.com/api/v1/free",
    searchEndpoint: "/point?place_id=london&sections=current&timezone=UTC&language=en&key=free",
    isKnown: false,
    auth: "No"
  },
  // TV & VIDEO
  {
    name: "TVMaze",
    category: "tv_video",
    baseUrl: "https://api.tvmaze.com",
    searchEndpoint: "/search/shows?q={query}",
    isKnown: true,
    auth: "No",
    description: "TV show database"
  },
  // GAMES
  {
    name: "PokéAPI",
    category: "games_comics",
    baseUrl: "https://pokeapi.co/api/v2",
    searchEndpoint: "/pokemon?limit=50",
    isKnown: true,
    auth: "No",
    description: "Pokémon data API"
  },
  {
    name: "Open Trivia",
    category: "games_comics",
    baseUrl: "https://opentdb.com/api.php",
    searchEndpoint: "?amount=10&encode=url3986",
    isKnown: false,
    auth: "No"
  },
  {
    name: "FreeToGame",
    category: "games_comics",
    baseUrl: "https://www.freetogame.com/api",
    searchEndpoint: "/games",
    isKnown: false,
    auth: "No"
  },
  {
    name: "Digimon API",
    category: "games_comics",
    baseUrl: "https://digimon-api.vercel.app/api",
    searchEndpoint: "/digimon",
    isKnown: false,
    auth: "No"
  },
  {
    name: "CheapShark",
    category: "games_comics",
    baseUrl: "https://www.cheapshark.com/api/1.0",
    searchEndpoint: "/deals?title={query}",
    isKnown: false,
    auth: "No"
  },
  // SPORTS
  {
    name: "Ergast F1",
    category: "sports",
    baseUrl: "http://ergast.com/api/f1",
    searchEndpoint: "/current/driverStandings.json",
    isKnown: true,
    auth: "No",
    description: "Historical Formula 1 data"
  },
  {
    name: "TheSportDB",
    category: "sports",
    baseUrl: "https://www.thesportsdb.com/api/v1/json/3",
    searchEndpoint: "/searchteams.php?t={query}",
    isKnown: false,
    auth: "No"
  },
  {
    name: "NBA Stats (Public)",
    category: "sports",
    baseUrl: "https://data.nba.net/10s/prod/v1",
    searchEndpoint: "/today/scoreboard.json",
    isKnown: false,
    auth: "No"
  },
  {
    name: "Cricket API (Public)",
    category: "sports",
    baseUrl: "https://api.cricapi.com/v1",
    searchEndpoint: "/currentMatches?apikey=free",
    isKnown: false,
    auth: "No"
  },
  {
    name: "Football Data (Guest)",
    category: "sports",
    baseUrl: "https://api.football-data.org/v4",
    searchEndpoint: "/matches",
    isKnown: false,
    auth: "No"
  },
  // HUMOR
  {
    name: "JokeAPI",
    category: "humor",
    baseUrl: "https://v2.jokeapi.dev",
    searchEndpoint: "/joke/Any?contains={query}&amount=10",
    isKnown: true,
    auth: "No",
    description: "Universal joke API"
  },
  {
    name: "ICanHazDadJoke",
    category: "humor",
    baseUrl: "https://icanhazdadjoke.com",
    searchEndpoint: "/search?term={query}",
    isKnown: false,
    auth: "No"
  },
  {
    name: "Evil Insult",
    category: "humor",
    baseUrl: "https://evilinsult.com",
    searchEndpoint: "/generate_insult.php?lang=en&type=json",
    isKnown: false,
    auth: "No"
  },
  {
    name: "Corporate B.S.",
    category: "humor",
    baseUrl: "https://corporatebs-generator.sameerkumar.website",
    searchEndpoint: "/",
    isKnown: false,
    auth: "No"
  },
  // SCIENCE
  {
    name: "NASA Images",
    category: "science",
    baseUrl: "https://images-api.nasa.gov",
    searchEndpoint: "/search?q={query}&limit=40",
    isKnown: true,
    auth: "No",
    description: "NASA image and video library"
  },
  {
    name: "CERN Open Data",
    category: "science",
    baseUrl: "https://opendata.cern.ch/api",
    searchEndpoint: "/records/?q={query}",
    isKnown: false,
    auth: "No"
  },
  {
    name: "USGS Earthquakes",
    category: "science",
    baseUrl: "https://earthquake.usgs.gov/fdsnws/event/1",
    searchEndpoint: "/query?format=geojson&limit=10",
    isKnown: false,
    auth: "No"
  },
  {
    name: "Periodic Table",
    category: "science",
    baseUrl: "https://neelpatel05.pythonanywhere.com",
    searchEndpoint: "/",
    isKnown: false,
    auth: "No"
  },
  {
    name: "Spaceflight News",
    category: "science",
    baseUrl: "https://api.spaceflightnewsapi.net/v4",
    searchEndpoint: "/articles/?search={query}",
    isKnown: false,
    auth: "No"
  },
  {
    name: "Launch Library",
    category: "science",
    baseUrl: "https://lldev.thespacedevs.com/2.2.0",
    searchEndpoint: "/launch/?search={query}",
    isKnown: false,
    auth: "No"
  },
  // SPACE
  {
    name: "SpaceX API",
    category: "space",
    baseUrl: "https://api.spacexdata.com/v5",
    searchEndpoint: "/launches/latest",
    isKnown: true,
    auth: "No",
    description: "Open-source SpaceX data"
  },
  // GOVERNMENT
  {
    name: "Census.gov",
    category: "government",
    baseUrl: "https://api.census.gov",
    searchEndpoint: "/data/2020/acs/acs5?get=NAME&for=state:*",
    isKnown: true,
    auth: "No",
    description: "United States Census bureau"
  },
  // MAPS
  {
    name: "Nominatim",
    category: "maps",
    baseUrl: "https://nominatim.openstreetmap.org",
    searchEndpoint: "/search?q={query}&format=json&limit=25",
    isKnown: true,
    auth: "No",
    description: "OpenStreetMap geocoding"
  },
  // TRANSPORTATION
  {
    name: "CityBikes",
    category: "transportation",
    baseUrl: "https://api.citybik.es/v2",
    searchEndpoint: "/networks?fields=id,name,location",
    isKnown: true,
    auth: "No",
    description: "Bicycle sharing networks"
  },
  // FINANCE
  {
    name: "Frankfurter",
    category: "finance",
    baseUrl: "https://api.frankfurter.app",
    searchEndpoint: "/latest?from={query}",
    isKnown: true,
    auth: "No",
    description: "Currency exchange rates"
  },
  {
    name: "WallstreetBets",
    category: "finance",
    baseUrl: "https://tradestie.com/api/v1",
    searchEndpoint: "/apps/reddit",
    isKnown: false,
    auth: "No"
  },
  {
    name: "ExchangeRate.host",
    category: "finance",
    baseUrl: "https://api.exchangerate.host",
    searchEndpoint: "/latest?base={query}",
    isKnown: false,
    auth: "No"
  },
  {
    name: "Finnhub (Guest)",
    category: "finance",
    baseUrl: "https://finnhub.io/api/v1",
    searchEndpoint: "/search?q={query}&token=sandbox_c8l9hda201qj9a501a30",
    isKnown: false,
    auth: "No"
  },
  {
    name: "EOD Historical",
    category: "finance",
    baseUrl: "https://eodhistoricaldata.com/api",
    searchEndpoint: "/search/{query}?api_token=oe6934c56e2978&fmt=json",
    isKnown: false,
    auth: "No"
  },
  // FOOD
  {
    name: "TheMealDB",
    category: "food_drink",
    baseUrl: "https://www.themealdb.com/api/json/v1/1",
    searchEndpoint: "/search.php?s={query}",
    isKnown: true,
    auth: "No",
    description: "Recipe database"
  },
  // HEALTH
  {
    name: "OpenFDA",
    category: "health",
    baseUrl: "https://api.fda.gov",
    searchEndpoint: "/drug/label.json?search={query}&limit=25",
    isKnown: true,
    auth: "No",
    description: "FDA open data"
  },
  // ART
  {
    name: "Art Institute Chicago",
    category: "art",
    baseUrl: "https://api.artic.edu/api/v1",
    searchEndpoint: "/artworks/search?q={query}&limit=30",
    isKnown: true,
    auth: "No",
    description: "Art Institute of Chicago collection"
  },
  // ENVIRONMENT
  {
    name: "Carbon Intensity UK",
    category: "environment",
    baseUrl: "https://api.carbonintensity.org.uk",
    searchEndpoint: "/intensity",
    isKnown: true,
    auth: "No",
    description: "UK carbon intensity data"
  },
  // QUOTES
  {
    name: "Quotable",
    category: "quotes",
    baseUrl: "https://api.quotable.io",
    searchEndpoint: "/random",
    isKnown: true,
    auth: "No",
    description: "Random quote API"
  },
  {
    name: "ZenQuotes",
    category: "quotes",
    baseUrl: "https://zenquotes.io",
    searchEndpoint: "/api/random",
    isKnown: false,
    auth: "No"
  },
  {
    name: "Forismatic",
    category: "quotes",
    baseUrl: "https://api.forismatic.com",
    searchEndpoint: "/api/1.0/?method=getQuote&format=json&lang=en",
    isKnown: false,
    auth: "No"
  },
  {
    name: "Kanye Rest",
    category: "quotes",
    baseUrl: "https://api.kanye.rest",
    searchEndpoint: "/",
    isKnown: false,
    auth: "No"
  },
  {
    name: "Advice Slip",
    category: "quotes",
    baseUrl: "https://api.adviceslip.com",
    searchEndpoint: "/advice/search/{query}",
    isKnown: false,
    auth: "No"
  },
  // ENTERTAINMENT
  {
    name: "Chuck Norris",
    category: "entertainment",
    baseUrl: "https://api.chucknorris.io",
    searchEndpoint: "/jokes/search?query={query}",
    isKnown: true,
    auth: "No",
    description: "Chuck Norris jokes"
  },
  // DEVELOPMENT
  {
    name: "APIs.guru",
    category: "development",
    baseUrl: "https://api.apis.guru/v2",
    searchEndpoint: "/list.json",
    isKnown: true,
    auth: "No",
    description: "Wikipedia for Web APIs"
  },
  // HISTORY
  {
    name: "Historical Events",
    category: "history",
    baseUrl: "https://history.muffinlabs.com",
    searchEndpoint: "/date",
    isKnown: true,
    auth: "No",
    description: "Today in history"
  },
  // LANGUAGE
  {
    name: "Free Dictionary",
    category: "language",
    baseUrl: "https://api.dictionaryapi.dev/api/v2",
    searchEndpoint: "/entries/en/{query}",
    isKnown: true,
    auth: "No",
    description: "Free dictionary API"
  },
  {
    name: "Translation API",
    category: "language",
    baseUrl: "https://api.mymemory.translated.net",
    searchEndpoint: "/get?q={query}&langpair=en|it",
    isKnown: false,
    auth: "No"
  },
  {
    name: "Random Word",
    category: "language",
    baseUrl: "https://random-word-api.herokuapp.com",
    searchEndpoint: "/word?number=10",
    isKnown: false,
    auth: "No"
  },
  {
    name: "Rhymezone",
    category: "language",
    baseUrl: "https://api.datamuse.com",
    searchEndpoint: "/words?rel_rhy={query}",
    isKnown: false,
    auth: "No"
  },
  // JOBS
  {
    name: "Arbeitnow",
    category: "jobs",
    baseUrl: "https://arbeitnow.com/api",
    searchEndpoint: "/job-board-api?search={query}",
    isKnown: true,
    auth: "No",
    description: "Job listings API"
  },
  // SECURITY
  {
    name: "FilterLists",
    category: "security",
    baseUrl: "https://filterlists.com/api",
    searchEndpoint: "/directory/lists",
    isKnown: true,
    auth: "No",
    description: "Comprehensive adblock list database"
  },
  // SOCIAL
  {
    name: "HackerNews Social",
    category: "social",
    baseUrl: "https://hacker-news.firebaseio.com/v0",
    searchEndpoint: "/topstories.json",
    isKnown: true,
    auth: "No"
  },
  // CALENDAR
  {
    name: "TimeAPI.io",
    category: "calendar",
    baseUrl: "https://timeapi.io/api",
    searchEndpoint: "/time/current/zone?timeZone=UTC",
    isKnown: true,
    auth: "No",
    description: "Current time and timezone information"
  },
  // OPEN DATA
  {
    name: "World Bank",
    category: "open_data",
    baseUrl: "https://api.worldbank.org/v2",
    searchEndpoint: "/country?format=json&per_page=20",
    isKnown: true,
    auth: "No",
    description: "Global development data"
  },
  // EDUCATION
  {
    name: "University Search",
    category: "education",
    baseUrl: "http://universities.hipolabs.com",
    searchEndpoint: "/search?name={query}",
    isKnown: true,
    auth: "No",
    description: "World university database"
  }
];
