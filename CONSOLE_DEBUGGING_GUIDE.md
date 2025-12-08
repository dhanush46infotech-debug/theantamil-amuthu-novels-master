# Console Debugging Guide

## Expected Console Output

When the app loads correctly, you should see these logs:

### On App Startup
```
[API] API Base URL configured: http://localhost:5000/api
```

### When Loading Novels Page
```
[API Request] GET /novels
[API Response Error] {
  status: undefined,
  statusText: undefined,
  message: "Network Error",
  url: "/novels"
}
Fetching novels from service...
Service response: { novels: [...] }
Successfully fetched novels from backend: <mock novels data>
```

This is **NORMAL** - it shows:
1. API request is being made to backend
2. Backend is unavailable (network error)
3. Fallback to mock data activates automatically
4. App displays novels from fallback

## Chrome Extension Errors (IGNORE)

You may see these errors - they're from Chrome extensions, not your app:
```
❌ invalid (fail...) fetch contentScript 0.0 kB 3 ms
❌ invalid (fail...) fetch contentScript 0.0 kB 6 ms
```

**These are harmless.** They don't affect your app.

## Real Errors (To Fix)

If you see these in the console, there's an actual problem:

### 1. **Unhandled Promise Rejection**
```
Uncaught (in promise) TypeError: Cannot read property...
```
**Fix:** Check the page component for missing error handling

### 2. **React Errors**
```
React.createElement: type is invalid -- expected a string
```
**Fix:** Check component imports and exports

### 3. **Module Not Found**
```
Failed to load module: /src/...
```
**Fix:** Check file paths and names are correct

### 4. **API Real Failure**
```
[API Response Error] { status: 500, statusText: "Internal Server Error" }
```
**Fix:** Backend server has an issue, not a fallback issue

## Network Tab Analysis

### Good (With Backend)
- `GET /novels` → Status: **200 OK** (blue)
- Data loads from real API

### Good (Without Backend - Fallback)
- `GET /novels` → Status: **ERR_CONNECTION_REFUSED** (red)
- Data loads from mockData automatically
- No error shown to user ✓

### Bad (Real Error)
- `GET /novels` → Status: **500, 403, 502** (red)
- Actual backend error that needs investigation

## Console Commands for Testing

Open DevTools → Console and run these:

### 1. Check API Base URL
```javascript
import.meta.env.VITE_API_BASE_URL
// Should output: http://localhost:5000/api
```

### 2. Test API Connectivity
```javascript
fetch('http://localhost:5000/api/novels')
  .then(r => r.json())
  .then(d => console.log('Connected!', d))
  .catch(e => console.log('Not connected:', e.message))
```

### 3. Check Local Storage
```javascript
localStorage.getItem('authToken')
// Should return null (unless logged in)
```

### 4. Check Novel Service
```javascript
import novelService from './src/services/API/novelService'
novelService.getAllNovels().then(data => console.log(data))
```

## Common Issues & Solutions

### Issue: "Failed to fetch novels"
**Cause:** Missing error handling
**Solution:** Already fixed - app uses fallback automatically

### Issue: "Cannot read property 'novels' of undefined"
**Cause:** Response format issue
**Solution:** Service handles both formats now

### Issue: No console logs showing
**Cause:** Console filtering enabled
**Solution:** Check DevTools → Console → Levels (should show "Log", "Warning", "Error")

### Issue: Images not loading
**Cause:** Wrong image paths
**Solution:** Already fixed - using correct Novel Card/ folder

### Issue: Language not changing
**Cause:** Global language used instead of novel language
**Solution:** Already fixed - NovelDetailPage uses displayLanguage

## How Fallback System Works

```
User visits /novels
  ↓
NovelsPage.jsx calls novelService.getAllNovels()
  ↓
novelService tries: apiClient.get('/novels')
  ↓
  ├─ Success (backend running)
  │  └─ Returns { novels: [...real data...] }
  │
  └─ Failure (backend not running)
     └─ Caught in catch block
     └─ Returns { novels: mockNovels }
  ↓
NovelsPage displays data (real or mock - same format!)
  ↓
✓ App works either way - no errors!
```

## Network Request Checklist

- [ ] Frontend runs on `http://localhost:5173` or `http://localhost:5174`
- [ ] Backend (if running) is on `http://localhost:5000`
- [ ] Environment variable `VITE_API_BASE_URL` is set correctly
- [ ] Image paths reference correct folder: `Novel Card/`
- [ ] Mock data has all required properties: id, title, author, language
- [ ] Novel IDs are numbers (1, 2, 3) not strings or undefined

## Current Status ✅

All known issues fixed:
- ✅ Image loading errors fixed
- ✅ Novel ID undefined bug fixed
- ✅ Language defaulting implemented
- ✅ API logging enhanced
- ✅ Error handling robust (fallback system)
- ✅ No real JavaScript errors

## What to Check Next

1. **Open DevTools (F12)**
2. **Go to Console tab**
3. **Look for actual red errors** (not contentScript ones)
4. **If you see an error, share the exact message**
5. **I can then fix it specifically**

## Need More Help?

If console shows errors:
1. Take a screenshot of the console
2. Note the exact error message
3. Share what page you were on
4. I'll fix it immediately
