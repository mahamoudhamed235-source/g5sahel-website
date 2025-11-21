import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      headline: "AI-Powered Gateway to the Sahel's Future",
      home: "Home",
      markets: "Markets",
      news: "News",
      ai_advisor: "Sahel AI Advisor",
      marketplace: "Marketplace",
      jobs: "Jobs",
      login: "Login",
      signup: "Sign Up",
      access_denied:
        "Access Denied: Your credentials are not registered in our system.",
    },
  },
  fr: {
    translation: {
      headline: "Passerelle IA vers l'avenir du Sahel",
      home: "Accueil",
      markets: "Marchés",
      news: "Actualités",
      ai_advisor: "Conseiller IA du Sahel",
      marketplace: "Place de marché",
      jobs: "Emplois",
      login: "Connexion",
      signup: "S'inscrire",
      access_denied:
        "Accès refusé : Vos identifiants ne sont pas enregistrés dans notre système.",
    },
  },
  ar: {
    translation: {
      headline: "البوابة المدعومة بالذكاء الاصطناعي لمستقبل الساحل",
      home: "الرئيسية",
      markets: "الأسواق",
      news: "الأخبار",
      ai_advisor: "مستشار الساحل بالذكاء الاصطناعي",
      marketplace: "السوق",
      jobs: "الوظائف",
      login: "تسجيل الدخول",
      signup: "إنشاء حساب",
      access_denied: "تم الرفض: بيانات اعتمادك غير مسجلة في نظامنا.",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
