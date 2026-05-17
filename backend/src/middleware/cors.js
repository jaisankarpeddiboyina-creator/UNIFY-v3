import cors from 'cors';

const corsOptions = {
  origin: '*', // Allow all for public aggregator
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type,Authorization'
};

export const corsMiddleware = cors(corsOptions);
