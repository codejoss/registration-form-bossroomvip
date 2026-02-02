import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import WelcomePage from "./pages/WelcomePage.tsx";
import FormPage from "./pages/FormPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import GratefulnessPage from "./pages/GratefulnessPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="" element={<App />} />
        <Route path="/" element={<App />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/registerform" element={<FormPage />} />
        <Route path="/gratefulness" element={<GratefulnessPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
