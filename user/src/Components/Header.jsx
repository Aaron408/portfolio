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
              AR
            </span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {["about", "projects", "skills", "certifications", "contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="relative text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-300 group"
                >
                  {t.nav[item]}
                  <span className="absolute bottom-1.5 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-[calc(100%-24px)] -translate-x-1/2 transition-all duration-300 ease-out opacity-0 group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <button
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1.5 rounded-md text-sm font-medium transition duration-300 hover:from-blue-600 hover:to-purple-700 flex items-center gap-2 overflow-hidden group"
            >
              <TbWorld className="transition-transform duration-300 group-hover:rotate-180" />
              {language === "es" ? "EN" : "ES"}
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;