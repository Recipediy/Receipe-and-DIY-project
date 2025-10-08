## Receipe and DIY project

A full‑stack web application for discovering, creating, and sharing cooking recipes and DIY projects, with social interactions, vendor listings, price comparisons, and an AI assistant to help users brainstorm ideas and steps. The project is split into a Node.js/Express backend and a React (Vite) frontend.

### Highlights
- **AI assistant**: Content guidance and ideation powered by Cohere.
- **Rich posts**: Create/edit posts with steps, images (Cloudinary), comments, shares, and bookmarks.
- **Social interactions**: Inline comments, reactions, reporting, and admin moderation.
- **Vendors & items**: Browse vendors, items, reviews, and submit vendor reports.
- **Price comparison**: Quick compare experience to find better prices.
- **Location-aware**: Mapbox integration and regional post discovery.
- **Auth & roles**: Email verification, protected routes, and admin features.

---

## Tech Stack

### Backend
- Node.js, Express
- MongoDB with Mongoose models (`user`, `post`, `comment`, `share`, `vendor`, `vendorItem`, `vendorReview`, `vendorReport`, `report`)
- Cloudinary for media uploads
- Cohere AI integration
- Email service for verification and notifications
- Geocoding utilities
- Auth: JWT tokens, protected routes, admin middleware

### Frontend
- React 18 + Vite
- Tailwind CSS + custom styles
- Zustand for state management
- Axios for API calls
- Mapbox GL for maps

---

## Repository Structure
```text
backend/
  src/
    controllers/        # route handlers (auth, posts, AI, vendors, reports, etc.)
    lib/                # integrations (db, cloudinary, cohere, email, geocoding, multer)
    middlewares/        # protectRoute, adminCheck, validation
    models/             # mongoose schemas
    routers/            # express routers per domain
    index.js            # app bootstrap
frontend/
  src/
    components/         # UI components (posts, comments, vendors, AI assistant)
    pages/              # app pages (home, profile, admin, vendors, etc.)
    store/              # Zustand stores
    lib/                # axios, currency, mapbox helpers
    main.jsx / App.jsx
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB instance (local or hosted)
- Cloudinary account (for media)
- Mapbox access token
- Cohere API key

### 1) Clone and install
```bash
# from the project root
cd backend && npm install
cd ../frontend && npm install
```

### 2) Configure environment variables
Create a `.env` file in `backend/` with values that match your environment:
```bash
# backend/.env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/recipe_diy
JWT_SECRET=replace-with-strong-secret

# Email (example)
EMAIL_FROM=noreply@example.com
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_smtp_user
EMAIL_PASS=your_smtp_pass

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Mapbox
MAPBOX_ACCESS_TOKEN=your_mapbox_token

# Cohere
COHERE_API_KEY=your_cohere_key
```

If the frontend needs environment values (e.g., Mapbox), create `frontend/.env` and follow Vite’s `VITE_` naming convention:
```bash
# frontend/.env
VITE_API_BASE_URL=http://localhost:5000
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token
```

### 3) Run the apps
```bash
# terminal 1
cd backend
npm run dev

# terminal 2
cd frontend
npm run dev
```

Backend defaults to `http://localhost:5000`. Vite dev server prints the frontend URL (typically `http://localhost:5173`).

---

## Common Scripts

### Backend (`backend/package.json`)
- `npm run dev`: Start server with nodemon
- `npm start`: Start server
- `node make-admin.js`: Promote a user to admin (utility)

### Frontend (`frontend/package.json`)
- `npm run dev`: Start Vite dev server
- `npm run build`: Production build
- `npm run preview`: Preview production build

---

## Key Features (by module)

### Authentication & Users
- Signup, login, JWT auth, email verification
- Admin checks via middleware in `backend/src/middlewares/adminCheck.js`

### Posts & Interactions
- Create, edit, draft, and publish posts with steps and images
- Comments, inline comments, shares, bookmarks, and reports
- Controllers under `backend/src/controllers/*` and models under `backend/src/models/*`

### Vendors & Price Comparison
- Vendor and item listings, reviews, and reporting
- Price comparison flow and quick compare button in UI

### AI Assistant
- `backend/src/controllers/ai.controller.js` with Cohere integration
- `frontend/src/components/AIAssistant.jsx` and `pages/AIAssistantPage.jsx`

### Maps & Location
- Mapbox utilities in `frontend/src/lib/mapbox.js` and `components/MapboxMap.jsx`
- Regional post discovery UI

---

## Development Notes
- Keep environment secrets out of version control.
- Match existing code style; prefer clarity over cleverness.
- When adding APIs, create a router in `backend/src/routers/` and a controller in `backend/src/controllers/`.
- For new frontend pages, register routes in `App.jsx` and build state with Zustand stores in `src/store/`.

---

## Contributing
1. Create a feature branch.
2. Make focused commits with clear messages.
3. Open a pull request describing changes, testing steps, and screenshots if UI.

---

## License
This project is provided without a specified license. If you intend to use or distribute it, consider adding a license file (e.g., MIT, Apache-2.0) that fits your needs.


