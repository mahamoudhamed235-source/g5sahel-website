// src/App.js
import React, { Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* COMPONENTS */
import Header from "./components/Header";
import Footer from "./components/Footer";

/* USER PAGES */
import Home from "./pages/Home";
import AIAdvisor from "./pages/AIAdvisor";
import News from "./pages/News";
import Article from "./pages/Article";
import Markets from "./pages/Markets";
import Marketplace from "./pages/Marketplace";
import Categories from "./pages/Categories";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import UserDashboard from "./pages/UserDashboard";

/* LIVE MARKETS */
import LiveMarkets from "./pages/LiveMarkets";

/* ⭐ ADDED — LIVE AGRICULTURE */
import LiveAgriculture from "./pages/LiveAgriculture";

/* ⭐ ADDED — LIVE ENERGY */
import LiveEnergy from "./pages/LiveEnergy";

/* ⭐ ADDED — LIVE METALS */
import LiveMetals from "./pages/LiveMetals";

/* ⭐ ADDED — LIVE LIVESTOCK */
import LiveLivestock from "./pages/LiveLivestock";

/* ⭐ ADDED — LIVE FOREX */
import LiveForex from "./pages/LiveForex";

export default function App() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState("en");

  function changeLanguage(l) {
    i18n.changeLanguage(l);
    setLang(l);
    document.dir = l === "ar" ? "rtl" : "ltr";
  }

  return (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <div className={`app-root theme-${lang}`}>
        <Header onLangChange={changeLanguage} />

        <main className="main-content">
          <Routes>
            {/* HOME */}
            <Route path="/" element={<Home />} />

            {/* AI ADVISOR */}
            <Route path="/ai-advisor" element={<AIAdvisor />} />

            {/* NEWS */}
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<Article />} />

            {/* MARKETS */}
            <Route path="/markets" element={<Markets />} />
            <Route path="/markets/live" element={<LiveMarkets />} />

            {/* ⭐ LIVE AGRICULTURE */}
            <Route
              path="/markets/live-agriculture"
              element={<LiveAgriculture />}
            />

            {/* ⭐ LIVE ENERGY */}
            <Route path="/markets/live-energy" element={<LiveEnergy />} />

            {/* ⭐ LIVE METALS */}
            <Route path="/markets/live-metals" element={<LiveMetals />} />

            {/* ⭐ LIVE LIVESTOCK */}
            <Route path="/markets/live-livestock" element={<LiveLivestock />} />

            {/* ⭐ LIVE FOREX */}
            <Route path="/markets/live-forex" element={<LiveForex />} />

            {/* MARKETPLACE */}
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/marketplace/product/:id" element={<ProductPage />} />

            {/* CATEGORIES */}
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:id" element={<CategoryPage />} />

            {/* JOBS */}
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />

            {/* USER DASHBOARD */}
            <Route path="/dashboard" element={<UserDashboard />} />

            {/* 404 */}
            <Route
              path="*"
              element={<div className="container">Page Not Found</div>}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Suspense>
  );
}
