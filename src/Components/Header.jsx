import React, { useState } from "react";

//Diccionario
import Dictionary from "../Utils/Dictionary";
import { useLanguage } from "../Utils/LanguageContext";

const Header = () => {
  const { language, setLanguage } = useLanguage();
  const t = Dictionary[language];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-90">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold">ES</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a
                href="#about"
                className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                {t.nav.about}
              </a>
              <a
                href="#projects"
                className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                {t.nav.projects}
              </a>
              <a
                href="#achievements"
                className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                {t.nav.achievements}
              </a>
              <a
                href="#contact"
                className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                {t.nav.contact}
              </a>
            </div>
          </div>
          <div>
            <button
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
            >
              {language === "es" ? "EN" : "ES"}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
