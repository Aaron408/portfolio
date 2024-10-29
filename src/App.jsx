import ProfilePhoto from "./Images/ProfilePhoto.jpg";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

// Components
import Header from "./Components/Header";

// Diccionario
import Dictionary from "./Utils/Dictionary";
import { useLanguage } from "./Utils/LanguageContext";

function App() {
  const { language } = useLanguage();
  const t = Dictionary[language];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <main className="pt-8 md:pt-8">
        <section
          id="about"
          className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-2xl font-semibold text-teal-400 mb-2">
                {t.greeting}
              </h2>
              <h1 className="text-5xl md:text-7xl font-bold mb-4">{t.name}</h1>
              <p className="text-2xl md:text-3xl text-teal-400 mb-6">
                {t.title}
              </p>
              <p className="text-xl mb-8">{t.description}</p>
              <div className="flex space-x-4 mb-8">
                <button className="bg-white text-black p-2 rounded-lg mr-2 font-semibold hover:bg-gray-200">
                  {t.downloadCV}
                </button>
                <button>
                  <FaGithub className="h-8 w-8 rounded-lg hover:bg-gray-100 hover:text-black p-1.5" />
                </button>
                <button>
                  <FaLinkedin className="h-8 w-8 rounded-lg hover:bg-gray-100 hover:text-black p-1.5" />
                </button>
                <button>
                  <FaTwitter className="h-8 w-8 rounded-lg hover:bg-gray-100 hover:text-black p-1.5" />
                </button>
              </div>
            </div>
            <div className="md:w-1/2 relative md:ml-36">
              <div className="w-64 h-64 md:w-96 md:h-96 bg-white rounded-full overflow-hidden">
                <img src={ProfilePhoto} alt={t.name} />
              </div>
              <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-teal-400 rounded-full p-2">
                <img src="/react-icon.svg" alt="React" className="w-8 h-8" />
              </div>
              <div className="absolute bottom-0 left-0 -mb-4 -ml-4 bg-yellow-400 rounded-full p-2">
                <img src="/js-icon.svg" alt="JavaScript" className="w-8 h-8" />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-400 rounded-full p-2">
                <img src="/html-icon.svg" alt="HTML" className="w-8 h-8" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          © 2023 {t.name}. {t.copyright}
        </div>
      </footer>
    </div>
  );
}

export default App;
