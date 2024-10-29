import React from "react";
import ProfilePhoto from "./Images/ProfilePhoto.jpg";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Header from "./Components/Header";
import Dictionary from "./Utils/Dictionary";
import { useLanguage } from "./Utils/LanguageContext";

import "./App.css";

//Icons
import { FaReact } from "react-icons/fa6";
import { FaHtml5 } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";

function App() {
  const { language } = useLanguage();
  const t = Dictionary[language];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-blue-900 text-white overflow-hidden relative">
      {/* Space effect overlay */}
      <div className="absolute inset-0 z-0">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>

      <Header />

      <main className="pt-8 md:pt-8 relative z-10">
        <section
          id="about"
          className="min-h-screen flex items-center justify-center"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <p className="hidden md:flex text-lg text-white mb-4">
                <span className="bg-green-400 bg-opacity-60 rounded-lg px-2.5 py-0.5">
                  {t.state}
                </span>
              </p>
              <h2 className="text-2xl font-semibold text-blue-300 mb-2">
                {t.greeting}
              </h2>
              <h1 className="text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                {t.name}
              </h1>
              <p className="text-2xl md:text-3xl text-blue-300 mb-6">
                {t.title}
              </p>

              <p className="text-xl mb-8 text-gray-300">{t.description}</p>

              {/* <p className="text-lg text-green-400 font-semibold mb-4">
                Estoy abierto a nuevas oportunidades de trabajo. ¡Hablemos!
              </p> */}

              <div className="flex space-x-4 mb-8">
                <button className="bg-blue-500 text-white p-2 rounded-lg mr-2 font-semibold hover:bg-blue-600 transition duration-300">
                  {t.downloadCV}
                </button>
                <button className="text-blue-300 hover:text-blue-100 transition duration-300">
                  <FaGithub className="h-8 w-8" />
                </button>
                <button className="text-blue-300 hover:text-blue-100 transition duration-300">
                  <FaLinkedin className="h-8 w-8" />
                </button>
                <button className="text-blue-300 hover:text-blue-100 transition duration-300">
                  <FaTwitter className="h-8 w-8" />
                </button>
              </div>
            </div>
            <div className="md:w-1/2 relative md:ml-36">
              <div className="w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden relative">
                <img src={ProfilePhoto} alt={t.name} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black bg-opacity-50 py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          © 2024 {t.name}. {t.copyright}
        </div>
      </footer>
    </div>
  );
}

export default App;
