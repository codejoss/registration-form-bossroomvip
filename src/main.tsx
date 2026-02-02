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
    <BrowserRouter>
      <Routes>
        <Route path="" element={<App />} />
        <Route path="/" element={<App />} />
        <Route path="/registration-form-bossroomvip/" element={<App />} />
        <Route
          path="/registration-form-bossroomvip/welcome"
          element={<Welcome />}
        />
        <Route
          path="/registration-form-bossroomvip/registerform"
          element={<FormPage />}
        />
        <Route
          path="/registration-form-bossroomvip/gratefulness"
          element={<Gratefulness />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
