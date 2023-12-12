import React, { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout.jsx";
import BreadCrumbs from "../../components/BreadCrumbs.tsx";
import images from "../../constants/images.js";
import { Link, useParams } from "react-router-dom";
import SuggestedPosts from "./container/SuggestedPosts.tsx";
import CommentsContainer from "./../../components/comments/CommentsContainer.tsx";
import SocialShareButtons from "../../components/comments/SocialShareButtons.tsx";
import { useQuery } from "@tanstack/react-query";
import { getSinglePost } from "../../services/index/posts.js";
import toast from "react-hot-toast";
import { generateHTML } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import italic from "@tiptap/extension-italic";
import bold from "@tiptap/extension-bold";
import parse from "html-react-parser";

import stables from "../../constants/stables.js";
import { useSelector } from "react-redux";
import ArticleDetailSkeleton from "./components/ArticleDetailSkeleton.tsx";
import ErrorMessage from "../../components/ErrorMessage.tsx";

const postsData = [
  {
    _id: 1,
    image: images.Post1Image,
    title: "Help children get better education.",
    createdAt: "2021-09-01T00:00:00.000Z",
  },
  {
    _id: 2,
    image: images.Post1Image,
    title: "Help children get better education.",
    createdAt: "2021-09-01T00:00:00.000Z",
  },
  {
    _id: 3,
    image: images.Post1Image,
    title: "Help children get better education.",
    createdAt: "2021-09-01T00:00:00.000Z",
  },
  {
    _id: 4,
    image: images.Post1Image,
    title: "Help children get better education.",
    createdAt: "2021-09-01T00:00:00.000Z",
  },
];

const tagsData = [
  "Education",
  "Health",
  "Lifestyle",
  "Technology",
  "Travel",
  "Food",
  "Fashion",
  "Beauty",
  "Sports",
];

const ArticleDetailPage = () => {
  const userState = useSelector((state) => state.user);
  const { slug } = useParams();
  const [breadCrumbsData, setBreadCrumbsData] = useState([{}]);
  const [body, setBody] = useState<string | Element | Element[] | null>(null);
  // const [body, setBody] = useState(null);

  const query = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getSinglePost({ slug }),
  });

  let { data, isLoading, isError, error } = query;

  useEffect(() => {
    if (query.isSuccess) {
      setBreadCrumbsData([
        { name: "Home", link: "/" },
        { name: "Blog", link: "/blog" },
        { name: "Article title", link: `/blog/${data.slug}` },
      ]);
      setBody(
        parse(
          generateHTML(data?.body, [Document, Paragraph, Text, italic, bold])
        ) as string | Element | Element[] | null
      );
    }
    if (query.isError) {
      toast.error("Error while fetching data");
    }
  }, [query.isSuccess, query.isError, query.data, isLoading, isError, error]);

  return (
    <MainLayout>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message={"Could'n fetch the post detail"} />
      ) : (
        <section className="container flex flex-col max-w-5xl px-5 py-5 mx-auto lg:flex-row lg:items-start">
          <article className="flex-1">
            {" "}
            <BreadCrumbs data={breadCrumbsData} />{" "}
            <img
              src={data?.photo ? data.photo : images.Sample}
              alt={data?.title}
              className="w-full rounded-xl"
            />
            <div className="flex gap-2 mt-4">
              {data?.categories.map((category) => (
                <Link
                  to={`/blog?category=${category.name}`}
                  className="inline-block mt-4 text-sm text-primary font-roboto md:text-base"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <h1 className="mt-4 text-xl font-medium font-roboto text-Dark-hard md:text-[26px] ">
              {data?.title}
            </h1>
            <div className="mt-4 prose-sm prose sm:prose-base">{body}</div>
            {data && (
              <CommentsContainer
                comments={data?.comments}
                className="mt-10"
                logginedUserId={userState?.userInfo?._id}
                postSlug={slug}
              />
            )}
          </article>
          <div>
            <SuggestedPosts
              header={"Latest Article"}
              posts={postsData}
              // className="mt-8 lg:mt-0 lg:max-w-xs"
              tags={tagsData}
              classname={"mt-8 lg:mt-0 lg:max-w-xs"}
            />
            <div className="mt-7">
              <h2 className="mb-4 font-medium font-roboto text-Dark-hard md:text-xl">
                Share on:
              </h2>
            </div>
            <SocialShareButtons
              url={encodeURI(`www.google.com`)}
              title={encodeURIComponent("This is a title")}
            />
          </div>
        </section>
      )}
    </MainLayout>
  );
};

export default ArticleDetailPage;
