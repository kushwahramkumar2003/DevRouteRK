import React, { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout.jsx";
import BreadCrumbs from "../../components/BreadCrumbs.tsx";
import images from "../../constants/images.js";
import { Link, useParams } from "react-router-dom";
import SuggestedPosts from "./container/SuggestedPosts.tsx";
import CommentsContainer from "./../../components/comments/CommentsContainer.tsx";
import SocialShareButtons from "../../components/comments/SocialShareButtons.tsx";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts, getSinglePost } from "../../services/index/posts.js";
import toast from "react-hot-toast";
import { generateHTML } from "@tiptap/react";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import ArticleDetailSkeleton from "./components/ArticleDetailSkeleton.tsx";
import ErrorMessage from "../../components/ErrorMessage.tsx";
import Editor from "../../components/editor/Editor.tsx";
import { extensions } from "../../constants/tiptapExtensions.js";


const ArticleDetailPage = () => {
  const userState = useSelector((state) => state.user);
  const { slug } = useParams();
  const [breadCrumbsData, setBreadCrumbsData] = useState([{}]);
  // eslint-disable-next-line
  const [body, setBody] = useState<string | Element | Element[] | null>(null);
  // const [body, setBody] = useState(null);

  const query2 = useQuery({
    queryKey: ["posts"],
    queryFn: () => getAllPosts(),
  });

  let { data: postsData } = query2;

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
      console.log("data?.body", data?.body);
      setBody(
        parse(generateHTML(data?.body, extensions)) as
          | string
          | Element
          | Element[]
          | null
      );
    }
    if (query.isError) {
      toast.error("Error while fetching data");
    }
    // eslint-disable-next-line
  }, [
    query.isSuccess,
    query.isError,
    query.data,
    isLoading,
    isError,
    error,
    postsData,
  ]);

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
                  to={`/blog?category=${category.title}`}
                  className="inline-block mt-4 text-sm text-primary font-roboto md:text-base"
                >
                  {category.title}
                </Link>
              ))}
            </div>
            <h1 className="mt-4 text-xl font-medium font-roboto text-Dark-hard md:text-[26px] ">
              {data?.title}
            </h1>
            <div className="w-full">
              {!isLoading && <Editor content={data?.body} editable={false} />}
            </div>
            {data && (
              <CommentsContainer
                comments={data?.comments}
                className="mt-10"
                logginedUserId={userState?.userInfo?._id}
                postSlug={slug}
              />
            )}
          </article>

          <div className="">
            <SuggestedPosts
              header={"Latest Article"}
              posts={postsData?.data}
              // className="mt-8 lg:mt-0 lg:max-w-xs"
              tags={data?.tags ? data.tags : []}
              classname={"mt-8 lg:mt-0 lg:max-w-xs"}
            />
            <div className="mt-7">
              <h2 className="mb-4 font-medium font-roboto text-Dark-hard md:text-xl">
                Share on:
              </h2>
            </div>
            <SocialShareButtons
              url={encodeURI(window.location.href)}
              title={encodeURIComponent(data?.title)}
            />
          </div>
        </section>
      )}
    </MainLayout>
  );
};

export default ArticleDetailPage;
