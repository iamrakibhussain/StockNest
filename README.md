# StockNest

## Project Overview
StockNest is a full-stack inventory and product browsing web app built with Express, SQLite, and vanilla JavaScript.
It includes category-wise product filtering, search, and frontend product card rendering.

## Tech Stack
- Backend: Node.js, Express
- Database: SQLite (`sqlite`, `sqlite3`)
- Frontend: HTML, CSS, Vanilla JavaScript

## Installation
1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

## Run Locally
1. Start the server:

```bash
npm run dev
```

2. Open in browser:
- `http://localhost:8000`

## API Routes
- `GET /api/products` -> Get all products
- `GET /api/categories` -> Get all categories
- `GET /api/categories/:categoryId/products` -> Get products by category
- `GET /api/products/search?name=milk` -> Search products by name

## Folder Structure
```text
StockNest/
+- controllers/
+- db/
+- migrations/
+- public/
¦  +- css/
¦  +- images/
¦  +- index.html
¦  +- index.js
+- routes/
+- services/
+- server.js
+- package.json
```

## Notes
- SQLite database file is `database.db` in project root.
- Run migration scripts before seeding if schema changes are added.
