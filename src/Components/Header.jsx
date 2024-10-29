import React from "react";
import Dictionary from "../Utils/Dictionary";
import { useLanguage } from "../Utils/LanguageContext";

import { TbWorld } from "react-icons/tb";

const Header = () => {
  const { language, setLanguage } = useLanguage();
  const t = Dictionary[language];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              ES
            </span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {["about", "projects", "achievements", "contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="text-gray-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  {t.nav[item]}
                </a>
              ))}
            </div>
          </div>
          <div>
            <button
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className="bg-blue-500 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-300 flex items-center gap-2"
            >
              <TbWorld />
              {language === "es" ? "EN" : "ES"}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
