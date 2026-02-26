# Eneba Search (Assignment)

## Live Demo
Frontend:
https://eneba-jx8cqob55-usaite7-4728s-projects.vercel.app

Backend API:
https://eneba-app.onrender.com/list

---

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

---

## API
GET /list  
GET /list?search=<text>

---

## Stack
- React (Vite)
- Tailwind v4
- Node.js + Express
- SQLite
- Fuse.js fuzzy search
## Data
3 games included:
- FIFA 23
- Red Dead Redemption 2
- Split Fiction

## AI usage (prompt history summary)

## 🤖 AI Prompt History / Usage

AI was used as a development assistant during this assignment.
The following types of prompts and interactions were used:

### UI and React development
- Asked for help debugging Tailwind styles and layout issues.
- Requested explanations about React hooks (useEffect, useState) and data fetching.
- Used AI to troubleshoot card layout and image rendering problems.

### Backend & API
- Asked AI how to create API routes (/list, /list?search=).
- Requested help implementing fuzzy search (Fuse.js fallback).
- Used AI guidance to fix static image serving with Express.

### Debugging & Problem solving
- Asked AI to help diagnose errors such as:
  - Cannot GET /
  - wrong fetch URLs
  - JSON responses not rendering
  - Git merge conflicts
- Used AI explanations to understand the root cause rather than copy solutions blindly.

### Deployment
- Asked AI for step-by-step help deploying:
  - Backend to Render
  - Frontend to Vercel
- Used AI to adjust production fetch() API URLs.

### Reflection
AI was used as a technical mentor and debugger, while implementation decisions, testing, and final integration were done manually.
