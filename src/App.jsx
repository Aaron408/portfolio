import React, { useState } from "react";
import "./App.css";

//Icons
import { FaGithub, FaLinkedin, FaTimes } from "react-icons/fa";
import {
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiTailwindcss,
  SiMysql,
  SiGit,
  SiHtml5,
} from "react-icons/si";
import { DiJava } from "react-icons/di";

import ProfilePhoto from "./Images/ProfilePhoto.jpg";

//Components
import Header from "./Components/Header";
import ProjectCard from "./Components/ProjectCard";

//Dictionary
import Dictionary from "./Utils/Dictionary";
import { useLanguage } from "./Utils/LanguageContext";

//Car Repair Service Images
import CRSLogin from "./Images/CRSImages/LoginCRS.jpg";
import CRSRegister from "./Images/CRSImages/SignInCRS.jpg";
import CRSDetails from "./Images/CRSImages/DetailsCRS.jpg";

//DigitAll Software Solutions Images
import DSSHome from "./Images/DSSImages/HomeDSS.jpg";
import DSSAboutUs from "./Images/DSSImages/AboutUsDSS.jpg";
import DSSServices from "./Images/DSSImages/ServicesDSS.jpg";

//Chronis Images
import CLogin from "./Images/ChronisImages/ChronisLogin.png";
import CHome from "./Images/ChronisImages/ChronisHome.png";
import CProfile from "./Images/ChronisImages/ChronisProfile.png";

function App() {
  const { language } = useLanguage();
  const t = Dictionary[language];

  const projects = [
    {
      title: "Car Repair Service",
      description: t.CRSdescription,
      repositorio: "https://github.com/Whusher/CarRepairService",
      images: [CRSLogin, CRSRegister, CRSDetails],
      technologies: ["React", "Node.js", "Tailwind CSS", "MySQL"],
    },
    {
      title: "DigitAll Software Solutions",
      description: t.DSSdescription,
      repositorio: "https://github.com/Aaron408/digitall-software",
      link: "https://digitallsoftwaresolutions.com/",
      images: [DSSHome, DSSAboutUs, DSSServices],
      technologies: ["React", "Vite", "Tailwind CSS"],
    },
    {
      title: "Chronis",
      description: t.ChronisDescription,
      repositorio: "https://github.com/Aaron408/cronis",
      images: [CLogin, CHome, CProfile],
      technologies: ["React", "Node.js", "Tailwind CSS", "MySQL", "JWT", "OAuth"],
    },
  ];

  const skills = [
    { name: "React", icon: SiReact, level: 90 },
    { name: "JavaScript", icon: SiJavascript, level: 70 },
    { name: "Node.js", icon: SiNodedotjs, level: 80 },
    { name: "Tailwind CSS", icon: SiTailwindcss, level: 70 },
    { name: "MySQL", icon: SiMysql, level: 85 },
    { name: "Git", icon: SiGit, level: 80 },
    { name: "HTML5", icon: SiHtml5, level: 75 },
    { name: "Java", icon: DiJava, level: 70 },
  ];

  // Estado para almacenar el índice de la imagen principal de cada proyecto
  const [mainImage, setMainImage] = useState(projects.map(() => 0));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const updateMainImage = (projectIndex, imageIndex) => {
    setMainImage((prevMainImage) => {
      const newMainImage = [...prevMainImage];
      newMainImage[projectIndex] = imageIndex;
      return newMainImage;
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background layers */}
      <div className="fixed inset-0">
        {/* Base gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900 to-blue-900 animate-gradient-y"></div>

        {/* Stars and twinkling effect layer */}
        <div className="absolute inset-0">
          <div className="stars"></div>
          <div className="twinkling"></div>
        </div>

        {/* Subtle glow effects */}
        <div className="absolute inset-0">
          <div className="glow-sphere top-1/4 left-1/4"></div>
          <div className="glow-sphere top-3/4 right-1/3"></div>
        </div>
      </div>
      <div className="relative z-10">
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

                <div className="flex space-x-4 mb-8 items-center">
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 text-white p-2 rounded-lg mr-2 font-semibold transition duration-300">
                    {t.downloadCV}
                  </button>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/Aaron408"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative rounded-lg transition duration-300"
                      aria-label="Visita mi perfil de GitHub"
                    >
                      <FaGithub className="h-8 w-8 text-blue-300 group-hover:text-blue-100 transition-colors duration-300" />
                      <span className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>

                    <a
                      href="https://www.linkedin.com/in/aaron-reyes-ruiz-8656b22b4/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative rounded-lg transition duration-300"
                      aria-label="Conéctate conmigo en LinkedIn"
                    >
                      <FaLinkedin className="h-8 w-8 text-blue-300 group-hover:text-blue-100 transition-colors duration-300" />
                      <span className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 relative md:ml-36">
                <div className="w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden relative">
                  <img src={ProfilePhoto} alt={t.name} />
                </div>
              </div>
            </div>
          </section>
          <section id="projects" className="py-16 bg-black bg-opacity-50">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 md:mx-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                {language === "es" ? "Proyectos" : "Projects"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={index}
                    project={project}
                    mainImage={mainImage[index]}
                    setMainImage={updateMainImage}
                    openModal={openModal}
                    projectIndex={index}
                  />
                ))}
              </div>

              {/* Modal */}
              {isModalOpen && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
                  onClick={closeModal}
                >
                  <div
                    className="relative max-w-3xl mx-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={selectedImage}
                      alt="Selected preview"
                      className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
                    />
                    {/* <button
                    className="h-10 w-10 absolute top-2 right-2 text-white text-2xl p-2 bg-gray-400 hover:bg-gray-500 rounded-full"
                    onClick={closeModal}
                  >
                    <FaTimes />
                  </button> */}
                  </div>
                </div>
              )}
            </div>
          </section>

          <section id="skills" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                {language === "es" ? "Habilidades" : "Skills"}
              </h2>

              <div className="grid grid-cols-4 auto-rows-[180px] gap-4 max-w-6xl mx-auto">
                {/* Feature Skill - Spans 2 columns and rows */}
                <div className="col-span-2 row-span-2 bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-sm rounded-3xl p-8 hover:scale-[1.02] transition-all duration-300 group">
                  <div className="h-full flex flex-col items-center justify-center space-y-4">
                    {/* Invoke the icon component correctly */}
                    <SiReact className="w-20 h-20 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-2xl font-bold text-white">
                      {skills[0].name}
                    </h3>
                    <div className="w-2/3 bg-gray-700/50 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${skills[0].level}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Regular Skills */}
                {skills.slice(1).map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-sm rounded-xl p-6 hover:scale-[1.02] transition-all duration-300 group"
                  >
                    <div className="h-full flex flex-col items-center justify-center space-y-3">
                      <skill.icon className="w-12 h-12 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                      <h3 className="text-lg font-semibold text-white">
                        {skill.name}
                      </h3>
                      <div className="w-full bg-gray-700/50 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-20 relative">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                {language === "es" ? "Contacto" : "Contact"}
              </h2>
              <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-xl p-8">
                <form className="space-y-6">
                  <div>
                    <label className="block text-white mb-2">
                      {language === "es" ? "Nombre" : "Name"}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">
                      {language === "es" ? "Mensaje" : "Message"}
                    </label>
                    <textarea
                      rows="4"
                      className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500 transition-colors duration-300"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                  >
                    {language === "es" ? "Enviar Mensaje" : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
