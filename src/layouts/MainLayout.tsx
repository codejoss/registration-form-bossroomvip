import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default MainLayout;
