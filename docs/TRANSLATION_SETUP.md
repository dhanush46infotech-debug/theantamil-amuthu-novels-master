# Novel Translation Setup Guide

This guide will help you set up and run the Tamil to English translation for chapters 10-12 of Novel 2.

## Prerequisites

- Node.js v14+ installed
- npm package manager
- Internet connection (for Google Translate API)

## Installation Steps

### Step 1: Install Required Dependencies

```bash
npm install google-translate-api-x
```

### Step 2: Extract Tamil Chapters

First, extract chapters 10-12 from the novel source:

```bash
node extract-chapters-10-12.cjs
```

This will create three JSON files:
- `chapter-10-tamil.json`
- `chapter-11-tamil.json`
- `chapter-12-tamil.json`

Each file contains:
- `title`: Chapter title in Tamil
- `subtitle`: Chapter subtitle
- `content`: Full chapter content in Tamil
- `metadata`: Information about the chapter

### Step 3: Translate to English

Run the translation script:

```bash
node translate-chapters.js
```

This will:
1. Read the Tamil chapter files
2. Split content into manageable chunks for better translation quality
3. Translate each chunk using Google Translate API
4. Save translated chapters to the `translations/` folder

**Note:** Translation may take several minutes depending on chapter length. Please be patient.

### Step 4: Review Translated Content

Check the `translations/` folder for output files:
- `chapter-10-english.json`
- `chapter-11-english.json`
- `chapter-12-english.json`

Each file contains:
- `title`: Translated chapter title
- `subtitle`: Translated chapter subtitle
- `content`: Translated chapter content
- `metadata`: Translation details

## Output Format

Each translated chapter file follows this structure:

```json
{
  "title": "Chapter Title in English",
  "subtitle": "Chapter Subtitle in English",
  "content": "Full chapter content in English...",
  "metadata": {
    "originalLanguage": "Tamil",
    "translatedLanguage": "English",
    "chapterNumber": 10,
    "translationDate": "2025-12-02T...",
    "translationTool": "Google Translate API"
  }
}
```

## How It Works

### Text Chunking Strategy

Large text blocks are automatically split into chunks to:
- Maintain translation quality
- Avoid API size limits
- Preserve paragraph and sentence structure
- Improve accuracy for long texts

### Chunk Sizes
- Maximum: 4,500 characters per chunk
- Splitting happens at paragraph boundaries (double newlines)
- Falls back to sentence boundaries if needed

### Rate Limiting

The script includes delays between API calls to:
- Avoid rate limiting from Google Translate API
- Stay within fair usage policies
- Ensure consistent translation quality

## Customization

You can modify the following in `translate-chapters.js`:

```javascript
// Change which chapters to translate
const CHAPTERS_TO_TRANSLATE = [10, 11, 12];

// Change output directory
const OUTPUT_DIR = './translations';

// Adjust chunk size for better quality (larger = fewer requests)
const maxChunkSize = 4500;

// Change delay between requests (milliseconds)
setTimeout(resolve => setTimeout(resolve, 500), ...);
```

## Troubleshooting

### "Module not found: google-translate-api-x"
```bash
npm install google-translate-api-x --save
```

### "Chapter X not found"
- Ensure chapter files are extracted using `extract-chapters-10-12.cjs`
- Check that source files exist in `src/utils/chapters/novel-2.js`

### Translation Quality Issues
- Increase `maxChunkSize` to provide more context
- Use a professional translation service for critical content
- Review translated text manually for accuracy

### API Rate Limiting
- Increase the delay between requests (currently 500ms)
- Split translation across multiple sessions
- Consider using a different translation provider

## Alternative Translation Services

If you want to use different translation providers:

### Azure Translator
```bash
npm install @azure/cognitiveservices-language-translator
```

### DeepL API
```bash
npm install deepl
```

Modify `translate-chapters.js` to use your preferred service.

## Attribution & Copyright

⚠️ **Important:** Ensure you have proper rights to translate this copyrighted content. 

When sharing translated work:
- Include original author attribution
- Mention this is a fan translation (if applicable)
- Include translation date and tool used
- Respect author's copyright terms

## Support

For issues or improvements:
1. Check the troubleshooting section above
2. Review Google Translate API documentation
3. Verify your chapter files are valid JSON
4. Ensure proper file permissions for output directory

---

**Last Updated:** December 2, 2025
