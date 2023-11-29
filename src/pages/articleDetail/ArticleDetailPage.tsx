import React from "react";
import MainLayout from "../../components/MainLayout.jsx";
import BreadCrumbs from "../../components/BreadCrumbs.tsx";
import images from "../../constants/images.js";
import { Link } from "react-router-dom";
import SuggestedPosts from "./container/SuggestedPosts.tsx";
import CommentsContainer from "./../../components/comments/CommentsContainer.tsx";
import SocialShareButtons from "../../components/comments/SocialShareButtons.tsx";

const breadCrumbsData = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Blog",
    link: "/blog",
  },
  {
    name: "Article title",
    link: "/blog/1",
  },
];

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
  return (
    <MainLayout>
      <section className="container flex flex-col max-w-5xl px-5 py-5 mx-auto lg:flex-row lg:items-start">
        <article className="flex-1">
          {" "}
          <BreadCrumbs data={breadCrumbsData} />{" "}
          <img
            src={images.Post1Image}
            alt="Post1Image"
            className="w-full rounded-xl"
          />
          <Link
            to="/blog?category=selectedCategory"
            className="inline-block mt-4 text-sm text-primary font-roboto md:text-base"
          >
            EDUCATION
          </Link>
          <h1 className="mt-4 text-xl font-medium font-roboto text-Dark-hard md:text-[26px] ">
            Help children get better education.
          </h1>
          <div className="mt-4 text-Dark-soft">
            <p className="leading-7">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
              iste dolor cumque labore doloremque esse, nesciunt maiores quasi
              architecto minima exercitationem illum ut voluptas vel laudantium
              et assumenda facilis ex error soluta. Nihil vitae dolor doloremque
              ut earum perspiciatis magni eum, id consequuntur et sunt quae
              aliquid omnis, fugit cupiditate.
            </p>
          </div>
          <CommentsContainer className="mt-10" logginedUserId="a" />
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
    </MainLayout>
  );
};

export default ArticleDetailPage;
