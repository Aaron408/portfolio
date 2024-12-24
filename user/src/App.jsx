import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./App.css";

import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

//Icons
import {
  FaGithub,
  FaLinkedin,
  FaFilePdf,
  FaDownload,
  FaExpand,
  FaTimes,
} from "react-icons/fa";
import {
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiTailwindcss,
  SiMysql,
  SiGit,
  SiHtml5,
  SiKotlin,
} from "react-icons/si";
import { DiJava } from "react-icons/di";

import ProfilePhoto from "./Images/ProfilePhoto.jpg";

//Components
import Header from "./Components/Header";
const ProjectCard = lazy(() => import("./Components/ProjectCard"));

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

import EnglishCertificate from "./Documents/EnglishCertificate.pdf";
import MendixCertificate from "./Documents/MendixCertificate.pdf";
import MyCV from "./Documents/MyCV.pdf";

import MendixLogo from "./Images/MendixLogo.png";
import BritishLogo from "./Images/BritishCouncilLogo.png";

function App() {
  const { language } = useLanguage();
  const t = Dictionary[language];
  const modalRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
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
      technologies: [
        "React",
        "Node.js",
        "Tailwind CSS",
        "MySQL",
        "JWT",
        "OAuth",
      ],
    },
  ];
  const [mainImage, setMainImage] = useState(projects.map(() => 0));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const skills = [
    { name: "React", icon: SiReact, level: 90 },
    { name: "JavaScript", icon: SiJavascript, level: 70 },
    { name: "Node.js", icon: SiNodedotjs, level: 85 },
    { name: "Tailwind CSS", icon: SiTailwindcss, level: 70 },
    { name: "MySQL", icon: SiMysql, level: 85 },
    { name: "Git", icon: SiGit, level: 80 },
    { name: "HTML5", icon: SiHtml5, level: 75 },
    { name: "Java", icon: DiJava, level: 70 },
    { name: "Kotlin", icon: SiKotlin, level: 70 },
  ];
  const [selectedCert, setSelectedCert] = useState(null);

  const certifications = [
    {
      name: "Mendix Rapid Developer",
      institution: "Mendix",
      date: "April - 2024",
      logo: MendixLogo,
      file: MendixCertificate,
    },
    {
      name: "English Level B2+",
      institution: "British Council",
      date: "June - 2024",
      logo: BritishLogo,
      file: EnglishCertificate,
    },
  ];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedCert(null);
      }
    };

    if (selectedCert) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [selectedCert]);

  // Function to handle CV download
  const handleCVDownload = () => {
    const link = document.createElement("a");
    link.href = MyCV;
    link.download = "AaronReyes_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to handle certification download
  const handleCertDownload = (file, name) => {
    const link = document.createElement("a");
    link.href = file;
    link.download = `${name}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

  const clearForm = () => {
    setEmail("");
    setName("");
    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !message) {
      return toast.warning("Rellena correctamente el formulario!.");
    }

    try {
      const response = await axios.post(
        "https://mailer-portfolio-git-main-aarons-projects-ab43df53.vercel.app/sendMessage",
        {
          name: name,
          email: email,
          message: message,
        }
      );

      if (response.data.success) {
        toast.success("Mensaje enviado correctamente.");
        clearForm();
      } else {
        toast.error("Error al enviar el mensaje.");
      }
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      toast.error("Hubo un problema con el envío.");
    }
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
                <p className="flex text-lg text-white mb-4">
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
                  <button
                    onClick={handleCVDownload}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 text-white p-2.5 px-3 rounded-lg mr-2 font-semibold transition duration-300 flex items-center"
                  >
                    <FaDownload className="mr-2" />
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
          <section id="projects" className="py-16 section-bg">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 md:mx-4">
              <h2 className="section-title">
                {language === "es" ? "Proyectos" : "Projects"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Suspense fallback={<div>Loading...</div>}>
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
                </Suspense>
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
                  </div>
                </div>
              )}
            </div>
          </section>

          <section id="skills" className="py-20 relative section-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="section-title">
                {language === "es" ? "Habilidades" : "Skills"}
              </h2>

              <div className="grid grid-cols-4 auto-rows-[180px] gap-4 max-w-6xl mx-auto">
                {/* Feature Skill - Spans 2 columns and rows */}
                <div className="col-span-2 row-span-2 bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-sm rounded-3xl p-8 hover:scale-[1.02] transition-all duration-300 group">
                  <div className="h-full flex flex-col items-center justify-center space-y-4">
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

          <section id="certifications" className="py-20 relative section-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="section-title">
                {language === "es" ? "Certificaciones" : "Certifications"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-sm rounded-xl p-6 hover:scale-[1.02] transition-all duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <img
                        src={cert.logo}
                        alt={`${cert.institution} logo`}
                        className="w-12 h-12 mr-4 object-contain"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {cert.name}
                        </h3>
                        <p className="text-sm text-gray-300">
                          {cert.institution} - {cert.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={() => handleCertDownload(cert.file, cert.name)}
                        className="flex-1 flex items-center justify-center py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                      >
                        <FaDownload className="mr-2" />
                        {language === "es" ? "Descargar" : "Download"}
                      </button>
                      <button
                        onClick={() => setSelectedCert(cert)}
                        className="flex items-center justify-center py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300"
                      >
                        <FaExpand className="mr-2" />
                        {language === "es" ? "Detalles" : "Details"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Modal para detalles del certificado */}
          {selectedCert && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
              aria-modal="true"
              role="dialog"
              aria-labelledby="cert-modal-title"
            >
              <div
                ref={modalRef}
                className="bg-gray-800 rounded-lg p-6 max-w-md w-full"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3
                    id="cert-modal-title"
                    className="text-xl font-semibold text-white"
                  >
                    {selectedCert.name}
                  </h3>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Cerrar modal"
                  >
                    <FaTimes />
                  </button>
                </div>
                <img
                  src={selectedCert.logo}
                  alt={`${selectedCert.institution} logo`}
                  className="w-26 h-26 mx-auto mb-4 object-contain"
                />
                <p className="text-gray-300 mb-2">
                  <strong>
                    {language === "es" ? "Institución:" : "Institution:"}
                  </strong>{" "}
                  {selectedCert.institution}
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>{language === "es" ? "Fecha:" : "Date:"}</strong>{" "}
                  {selectedCert.date}
                </p>
                <button
                  onClick={() =>
                    handleCertDownload(selectedCert.file, selectedCert.name)
                  }
                  className="w-full flex items-center justify-center py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  <FaDownload className="mr-2" />
                  {language === "es"
                    ? "Descargar Certificado"
                    : "Download Certificate"}
                </button>
              </div>
            </div>
          )}

          {/* Contact Section */}
          <section id="contact" className="py-20 relative section-bg">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="section-title">
                {language === "es" ? "Contacto" : "Contact"}
              </h2>
              <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-xl p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-white mb-2">
                      {language === "es" ? "Nombre" : "Name"}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">
                      {language === "es" ? "Mensaje" : "Message"}
                    </label>
                    <textarea
                      rows="4"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
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

