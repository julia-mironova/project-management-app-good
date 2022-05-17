import * as i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
// import ua from './locales/ua.json';
import ru from './locales/ru.json';

const resources = {
  en: {
    translation: en,
  },
  // ua: {
  //   translation: ua,
  // },
  ru: {
    translation: ru,
  },
};

const options = {
  order: ['localStorage'],
  lookupLocalStorage: 'i18nextLng',
  caches: ['localStorage'],
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    detection: options,
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });