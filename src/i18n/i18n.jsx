import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import vi from "./locales/vi.json";
import useLanguage from "../store/language/useLanguage";

i18n.use(initReactI18next).init({
  resources: {
    EN: { translation: en },
    VI: { translation: vi },
  },
  lng: "VI", // Đặt mặc định ban đầu là VI, sẽ cập nhật sau
  fallbackLng: "VI",
  interpolation: { escapeValue: false },
});

export const syncLanguageWithI18n = () => {
  const { language } = useLanguage.getState();
  i18n.changeLanguage(language);
};

export default i18n;
