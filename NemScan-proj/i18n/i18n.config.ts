import i18next, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { en, da } from './locales';

const resources = {
    en: { translation: en },
    da: { translation: da },
};

const deviceLocales = Localization.getLocales();
const languageCode = deviceLocales.length > 0 ? deviceLocales[0].languageCode : 'en';

const options: InitOptions = {
    resources,
    lng: languageCode || 'en',
    fallbackLng: 'en',
    debug: true,
    interpolation: { escapeValue: false },
};

console.log('Detected locale from device:', deviceLocales[0].languageCode);

i18next
    .use(initReactI18next)
    .init(options)
    .then(() => console.log('i18next initialized with', languageCode));

export default i18next;
