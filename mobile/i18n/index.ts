import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import en from "@/locales/en/translation.json";
import ko from "@/locales/ko/translation.json";
import storage from "@/storage";

const resources = {
  en: { translation: en },
  ko: { translation: ko },
};

const initI18n = async () => {
  const userDefaultLang =
    (await storage.retreive("default.language")) ??
    Localization.getLocales()[0].languageCode!;

  i18n.use(initReactI18next).init({
    resources,
    lng: userDefaultLang,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();
export const setDefaultLangauge = (lng: string) => {
  i18n.changeLanguage(lng);
  storage.save("default.language", lng);
};
export default i18n;
