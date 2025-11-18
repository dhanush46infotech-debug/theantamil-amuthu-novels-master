# Project Restructuring Guide

## Overview
This project has been restructured following professional React best practices and industry-standard folder organization.

## New Folder Structure

```
src/
├── assets/
│   ├── images/
│   │   ├── brand/          # Logo and branding assets
│   │   ├── genres/         # Genre images (Romantic, Horror, etc.)
│   │   └── social/         # Social media icons
│   └── icons/              # SVG and icon files
│
├── components/
│   ├── common/             # Reusable components across the app
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   └── ReadNowButton.module.scss
│   │   └── Modal/
│   │       ├── YouTubeModal.jsx
│   │       └── YouTubeModal.module.scss
│   └── layout/             # Layout components (Header, Footer, etc.)
│       └── Footer/
│           ├── Footer.jsx
│           └── Footer.module.scss
│
├── pages/
│   └── HomePage/           # HomePage with all its components
│       ├── components/     # Page-specific components
│       │   ├── ImageCarousel.jsx
│       │   ├── SocialIcons.jsx
│       │   ├── StarsBackground.jsx
│       │   └── WelcomeText.jsx
│       ├── HomePage.jsx
│       └── HomePage.module.scss
│
├── hooks/                  # Custom React hooks
│   └── useImageCarousel.js
│
├── utils/                  # Helper functions and utilities
│   ├── constants.js        # App-wide constants
│   └── generateStars.js
│
├── styles/
│   ├── abstracts/          # Variables, mixins, functions
│   │   └── _variables.scss
│   ├── base/               # Global styles
│   │   └── global.css
│   └── [legacy files]      # Old style files (to be cleaned up)
│
├── App.jsx
├── main.jsx
└── index.css
```

## Key Improvements

### 1. **Component Organization**
- **common/**: Reusable components that can be used anywhere
- **layout/**: Components that define the page structure
- **pages/**: Page components with their specific sub-components

### 2. **Asset Management**
- Images organized by category (brand, genres, social)
- Easy to locate and maintain assets
- Removed duplicate files (youtube-logo duplicates)

### 3. **Code Reusability**
- Extracted hardcoded data into `utils/constants.js`
- Created custom hooks (`useImageCarousel.js`)
- Utility functions separated (`generateStars.js`)

### 4. **Better Maintainability**
- Each component has its styles in the same folder
- Clear separation of concerns
- Easier to test and debug

### 5. **Scalability**
- Easy to add new pages
- Simple to extend with new features
- Ready for routing implementation

## What Was Changed

### Components
- ✅ `HeroSection.jsx` → Broken down into smaller components in `pages/HomePage/`
- ✅ `Footer.jsx` → Moved to `components/layout/Footer/`
- ✅ Created reusable `Button` component
- ✅ Created reusable `YouTubeModal` component

### Data Management
- ✅ YouTube channels → `utils/constants.js`
- ✅ Social media links → `utils/constants.js`
- ✅ Genre images data → `utils/constants.js`
- ✅ Carousel settings → `utils/constants.js`

### Custom Hooks
- ✅ `useImageCarousel` - Manages image carousel rotation logic

### Utilities
- ✅ `generateStars` - Creates star animation data

### Removed Files
- ❌ Duplicate YouTube logo files
- ❌ Unused `app.js` in root
- ❌ Old component files (moved to new structure)
- ❌ `.history` folder

## Benefits

### Developer Experience
- **Clear Structure**: Easy to find files
- **Consistent Naming**: PascalCase for components, camelCase for utilities
- **Co-location**: Styles next to components
- **Separation**: Logic, UI, and data separated

### Performance
- Easier code splitting by page
- Optimized imports
- Better tree-shaking

### Team Collaboration
- Standard conventions
- Self-documenting structure
- Easy onboarding

### Testing
- Components isolated for unit testing
- Utilities can be tested independently
- Mock data in constants

## Migration Notes

### Import Path Updates
All import paths have been updated to reflect the new structure:

```javascript
// Old
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import logo from './assets/TTM NOVRLS.png';

// New
import Footer from './components/layout/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import logo from './assets/images/brand/TTM NOVRLS.png';
```

### SCSS Variables
All SCSS files now import variables from the correct path:

```scss
// Updated
@use '../../../styles/abstracts/variables' as *;
```

## Next Steps (Optional Enhancements)

1. **Add Routing** - Implement React Router for multi-page navigation
2. **State Management** - Add Context API or Redux if needed
3. **API Integration** - Create `services/` folder for API calls
4. **Testing** - Add test files next to components
5. **Type Safety** - Consider adding TypeScript
6. **Performance** - Implement lazy loading for pages
7. **Clean Up** - Remove old unused style files in `src/styles/`

## Build Status
✅ Application builds successfully
✅ All imports resolved correctly
✅ No breaking changes to functionality

## Running the Application

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

**Restructured on:** 2025-11-18
**Status:** ✅ Complete and tested
