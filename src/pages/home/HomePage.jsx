import React from "react";
import MainLayout from "../../components/MainLayout.jsx";
import Hero from "./container/Hero.tsx";
import Article from "./container/Article.tsx";
import CTA from "./container/CTA.tsx";

const HomePage = () => {
  return (
    <MainLayout>
      <Hero />
      <Article />
      <CTA />
    </MainLayout>
  );
};

export default HomePage;
