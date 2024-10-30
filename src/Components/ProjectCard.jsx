/* eslint-disable react/prop-types */
import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Dictionary from "../Utils/Dictionary";
import { useLanguage } from "../Utils/LanguageContext";

const ProjectCard = ({
  project,
  mainImage,
  setMainImage,
  openModal,
  projectIndex,
}) => {
  const { language } = useLanguage();
  const t = Dictionary[language];

  return (
    <div className="bg-gray-700 bg-opacity-30 backdrop-blur-sm rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
      <h3 className="text-2xl font-semibold text-blue-300 mb-3">
        {project.title}
      </h3>
      <p className="text-gray-200 mb-10">{project.description}</p>

      <div className="flex flex-col md:flex-row md:space-x-6 mb-6">
        {/* Contenedor de miniaturas */}
        <div className="flex flex-row md:flex-col space-x-8 md:space-x-0 md:space-y-4 order-2 md:order-1 mt-12 md:mt-0">
          {project.images.map((image, idx) => (
            <img
              key={idx}
              src={image}
              alt={`${project.title} thumbnail ${idx + 1}`}
              className={`w-16 h-16 object-cover cursor-pointer rounded-lg shadow-md transition duration-300 transform hover:scale-105
                ${idx === mainImage ? "border-2 border-white" : ""}`}
              onClick={() => setMainImage(projectIndex, idx)}
            />
          ))}
        </div>

        {/* Contenedor de la imagen principal */}
        <div className="relative flex-grow h-64 order-1 md:order-2 perspective-1000">
          <div className="relative w-full h-full">
            {project.images.map((image, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-all duration-500 ease-out pr-10`}
                style={{
                  transform: mainImage === idx
                    ? 'scale(1.05) translateX(16px) translateY(-16px)'
                    : idx === 0
                    ? 'rotate(-5deg) translateX(16px) translateY(-16px)'
                    : idx === 1
                    ? 'translateX(24px) translateY(4px)'
                    : 'rotate(5deg) translateX(32px) translateY(16px)',
                  zIndex: mainImage === idx ? 30 : idx === 1 ? 20 : 10,
                }}
              >
                <div 
                  className="w-full h-full cursor-pointer overflow-hidden rounded-lg"
                  onClick={() => openModal(project.images[mainImage])}
                >
                  <img
                    src={image}
                    alt={`${project.title} preview ${idx + 1}`}
                    className="w-full h-full object-cover shadow-lg"
                    style={{
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tecnologías */}
      <div className="flex flex-wrap gap-2 mb-6 md:mt-14">
        {project.technologies.map((tech, idx) => (
          <span
            key={idx}
            className="px-3 py-1 text-sm rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Enlaces */}
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href={project.repositorio}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-300 text-white font-medium group ${
            project.link ? "w-full sm:w-1/2" : "w-full"
          }`}
        >
          <FaGithub className="mr-2 group-hover:scale-110 transition-transform duration-300" />
          {language === "es" ? "Ver en GitHub" : "Go to GitHub"}
        </a>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 inline-flex items-center justify-center px-4 py-2 rounded-lg duration-300 text-white font-medium group w-full sm:w-1/2"
          >
            <FaExternalLinkAlt className="mr-2 group-hover:scale-110 transition-transform duration-300" />
            {language === "es" ? "Ver proyecto" : "View project"}
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;