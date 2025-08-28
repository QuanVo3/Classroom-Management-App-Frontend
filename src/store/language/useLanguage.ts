import { create } from "zustand";

interface LanguageStore {
    language: string;
    setLanguage: (lang: string) => void;
}

const useLanguage = create<LanguageStore>((set) => ({
    language: typeof window !== "undefined" ? localStorage.getItem("language") || "VI" : "VI",
    setLanguage: (lang: string) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("language", lang);
        }
        set({ language: lang });
    },
}));

export default useLanguage;
