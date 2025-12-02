import tamilTranslations from './tamil';
import englishTranslations from './english';

export const translations = {
  tamil: tamilTranslations,
  english: englishTranslations
};

export const getTranslation = (language, key) => {
  const keys = key.split('.');
  let value = translations[language];

  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }

  return value || key;
};
