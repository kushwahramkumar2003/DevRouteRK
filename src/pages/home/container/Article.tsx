import React from "react";
import ArticleCard from "../../../components/ArticleCard.tsx";
import { FaArrowRight } from "react-icons/fa";

const Article = () => {
  return (
    <section className="container flex flex-col px-5 py-10 mx-auto">
      <div className="flex flex-wrap md:gap-x-5 gap-y-5">
        <ArticleCard
          className={"w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"}
        />
        <ArticleCard
          className={"w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"}
        />
        <ArticleCard
          className={"w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"}
        />
        <ArticleCard
          className={"w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"}
        />
      </div>
      <button className="flex items-center px-6 py-3 mx-auto font-bold border-2 rounded-lg gap-x-2 text-primary border-primary">
        <span>More articles </span>
        <FaArrowRight className="w-3 h-3 " />
      </button>
    </section>
  );
};

export default Article;
