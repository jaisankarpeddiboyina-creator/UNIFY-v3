import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import searchRoutes from "./backend/src/routes/search.js";
import shareRoutes from "./backend/src/routes/share.js";
import categoryRoutes from "./backend/src/routes/categories.js";

// In ESM environment, __dirname is not available by default
// For bundled CJS, __dirname will be available
const __dirname = path.resolve();

async function startServer() {
  try {
    console.log("Starting server...");
    const app = express();
    const PORT = 3000;

  app.set("trust proxy", 1);

  app.use(cors());
  app.use(compression());
  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
  }));
  app.use(express.json());

  // API Routes Logger
  app.use((req, res, next) => {
    if (req.url.startsWith("/api/")) {
      console.log(`[API REQUEST] ${req.method} ${req.url}`);
    }
    next();
  });
  app.use("/api/search", searchRoutes);
  app.use("/api/share", shareRoutes);
  app.use("/api/categories", categoryRoutes);
  
  app.get("/api/health", (req, res) => res.json({ status: "ok" }));

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
      root: path.resolve(__dirname),
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => res.sendFile(path.join(distPath, "index.html")));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`UNIFY Server running on http://localhost:${PORT}`);
  });
} catch (err) {
  console.error("Critical: Failed to start server:", err);
}
}

startServer();
