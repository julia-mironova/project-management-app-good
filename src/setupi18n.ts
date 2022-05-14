import * as i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

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

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});
