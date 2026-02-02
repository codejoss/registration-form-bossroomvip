import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import Welcome from "./pages/Welcome.tsx";
import FormPage from "./pages/FormPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import Gratefulness from "./pages/Gratefulness.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="" element={<App />} />
        <Route path="/" element={<App />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/registerform" element={<FormPage />} />
        <Route path="/gratefulness" element={<Gratefulness />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
