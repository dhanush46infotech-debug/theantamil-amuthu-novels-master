# Frontend & Backend Integration Guide

## Current Status: ✅ INTEGRATED

### Frontend Setup
- **Framework**: React 19 + Vite
- **Location**: `src/`
- **Running on**: `http://localhost:5173`

### Backend Integration Points

#### 1. API Configuration
**File**: `src/services/API/config.js`

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
```

**Environment Variable Required**:
```bash
VITE_API_BASE_URL=http://your-backend-url/api
```

#### 2. Novel Service
**File**: `src/services/API/novelService.js`

**API Endpoints Used**:
- `GET /novels` - Fetch all novels
- `GET /novels/:id` - Fetch specific novel
- `GET /novels/slug/:slug` - Fetch novel by slug

**Fallback System**:
- If backend is unavailable → Uses `mockData.js`
- ALWAYS returns data (never throws errors)
- Seamless fallback for development

#### 3. API Client
**File**: `src/services/API/client.js`

**Features**:
- Axios instance with error handling
- Request/Response interceptors
- Auth token management
- 10-second timeout

#### 4. Mock Data
**File**: `src/services/API/mockData.js`

**Contains**:
- 3 sample novels
- Complete metadata
- Used as fallback when backend unavailable

---

## How to Connect to Backend

### Step 1: Start Backend Server
```bash
# Your backend should run on port 5000
node server.js
# or
npm start
```

### Step 2: Create `.env` file in project root
```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

### Step 3: Start Frontend
```bash
npm run dev
```

### Step 4: Backend API Requirements

Your backend must provide these endpoints:

#### `GET /api/novels`
**Response**:
```json
{
  "novels": [
    {
      "id": 1,
      "title": "Novel Title",
      "titleEnglish": "English Title",
      "description": "Description",
      "genre": "drama",
      "totalChapters": 27,
      "image": "/path/to/image.jpg",
      "status": "ongoing"
    }
  ]
}
```

#### `GET /api/novels/:id`
**Response**:
```json
{
  "id": 1,
  "title": "Novel Title",
  "chapters": [
    {
      "id": 1,
      "title": "Chapter 1",
      "content": "Chapter content..."
    }
  ]
}
```

---

## Running Mode

### Mode 1: Development (No Backend)
- Backend unavailable
- Uses mock data automatically
- **Perfect for**: Local development, testing UI

```bash
npm run dev
# Novels load from mockData.js
```

### Mode 2: With Backend
- Backend running on port 5000
- Fetches real data from API
- **Perfect for**: Production-like testing

```bash
# Terminal 1: Start Backend
node backend/server.js

# Terminal 2: Start Frontend
npm run dev
# Novels fetch from backend API
```

---

## Testing Integration

### Test 1: Backend Available
1. Start backend server
2. Set `VITE_API_BASE_URL` in `.env`
3. Check browser console → Should see "Successfully fetched novels from backend"

### Test 2: Backend Unavailable
1. Stop backend server
2. Restart frontend
3. Check browser console → Should see "Backend API unavailable, using fallback mock data"
4. Novels still display from mock data ✅

---

## File Structure

```
src/
├── services/
│   └── API/
│       ├── client.js           # Axios client with interceptors
│       ├── config.js           # API endpoints & base URL
│       ├── novelService.js     # Novel API service with fallback
│       └── mockData.js         # Mock novels (fallback data)
├── pages/
│   └── NovelsPage/
│       └── NovelsPage.jsx      # Novels list page
└── ...
```

---

## Troubleshooting

### Issue: "Failed to load novels"
**Solution**: 
1. Check if backend is running
2. Check if API_BASE_URL is correct
3. Mock data should load automatically

### Issue: CORS Errors
**Solution**:
Add CORS headers in backend:
```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### Issue: Timeout Errors
**Solution**:
- Check if backend is responding
- Increase timeout in `client.js` if needed

---

## Deploy to Production

### Frontend (Vercel)
```bash
npm run build
# Deploy `dist/` folder to Vercel
```

### Backend API URL
Set environment variable on Vercel:
```
VITE_API_BASE_URL=https://your-api.com/api
```

---

## Status: ✅ Ready for Production

- ✅ Frontend developed and tested
- ✅ Backend integration ready
- ✅ Fallback system in place
- ✅ Mock data for development
- ✅ Error handling implemented
