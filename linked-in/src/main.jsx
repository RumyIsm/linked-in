import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import i18next from "i18next";
import global_en from "../src/locales/en/global.json"
import global_al from "../src/locales/al/global.json"
import { I18nextProvider } from "react-i18next";
import "./index.css";

const savedLanguage = localStorage.getItem("language") || "en";
i18next.init({
  interpolation: { escapeValue: false },
  lng: savedLanguage,
  resources: {
    en: {
      global: global_en,
    },
    al: {
      global: global_al,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
    <RouterProvider router={router} />
    <ToastContainer />
    </I18nextProvider>
    </React.StrictMode>
);