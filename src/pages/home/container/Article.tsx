import React, { useEffect } from "react";
import ArticleCard from "../../../components/ArticleCard.tsx";
import { FaArrowRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../../services/index/posts.js";
import toast from "react-hot-toast";
import ArticleCardSkeleton from "../../../components/ArticleCardSkeleton.tsx";
import ErrorMessage from "../../../components/ErrorMessage.tsx";

const Article = () => {
  const {
    data: postsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
  });

  useEffect(() => {
    if (isError) {
      toast.error(error.name, { duration: 4000 });
    }
    console.log("use effect");
  }, [isError, isLoading, postsData]);

  return (
    <section className="container flex flex-col px-5 py-10 mx-auto">
      <div className="flex flex-wrap md:gap-x-5 gap-y-5">
        {isLoading ? (
          [...Array(5)].map((item, index) => (
            <ArticleCardSkeleton
              className={
                "w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
              }
              key={index}
            />
          ))
        ) : isError ? (
          <ErrorMessage message={"Couldn't fetch the posts data"} />
        ) : (
          postsData.data.map((post) => {
            return (
              <ArticleCard
                key={post._id}
                post={post}
                className={
                  "w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
                }
              />
            );
          })
        )}
      </div>
      <button className="flex items-center px-6 py-3 mx-auto font-bold border-2 rounded-lg gap-x-2 text-primary border-primary">
        <span>More articles </span>
        <FaArrowRight className="w-3 h-3 " />
      </button>
    </section>
  );
};

export default Article;
