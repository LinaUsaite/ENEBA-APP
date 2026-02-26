# Eneba Search (Assignment)

## Run locally
### Backend
cd server
npm install
npm start
API runs on http://localhost:3000

### Frontend
cd ..
npm install
npm run dev
App runs on http://localhost:5173

## API
- GET /list
- GET /list?search=<text>  (FTS5 + Fuse.js fallback)

## Data
3 games included:
- FIFA 23
- Red Dead Redemption 2
- Split Fiction

## AI usage (prompt history summary)
- Planned project structure (Vite + React + Tailwind + Node + SQLite)
- Implemented /list and /list?search endpoints
- Added fuzzy search with SQLite FTS5 and Fuse.js fallback
- Matched UI layout to screenshot (grid, cards, search bar)