import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./translations/en";
import fr from "./translations/fr";
// on peut précisé les angue souhaité dans "resources"
// chaque clé correspond a une langue (en, fr ...)
// i18n ne marche que les chose en dur (pas pour les api par exemple)
const resources = {
  en,
  fr
};

i18n.use(initReactI18next).init({
  resources,
  lng: "fr",
  compatibilityJSON: "v3", // Regle le soucis Warning android
  fallbackLng: "en",
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});
