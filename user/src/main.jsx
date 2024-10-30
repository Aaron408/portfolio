import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LanguageProvider } from "./Utils/LanguageContext.jsx";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <LanguageProvider>
    <StrictMode>
      <App />
      <ToastContainer />
    </StrictMode>
  </LanguageProvider>
);
