import React from "react";
import { images } from "../constants";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

const ArticleCard = ({ post, className }) => {
  return (
    <div
      className={`overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] rounded-xl ${className}`}
    >
      <Link to={`/blog/${post.slug}`}>
        <img
          src={post.photo ? post.photo : images.Sample}
          alt="title"
          className="object-cover object-center w-full h-auto md:h-52 lg:h-48 xl:h-[15rem] 2xl:h-[17rem]"
        />
      </Link>
      <div className="p-5 ">
        <Link to={`/blog/${post.slug}`}>
          <h2 className="text-xl font-bold font-roboto text-Dark-soft md:text-2xl lg:text-[28px]">
            {post.title}
          </h2>
          <p className="mt-3 text-md text-Dark-light md:text-lg">
            {post.caption}
          </p>
        </Link>
        <div className="flex items-center justify-between mt-6 flex-nowrap">
          <div className="flex items-center gap-x-2 md:gap-x-2.5">
            <img
              src={post.user.avatar ? post.user.avatar : images.User}
              alt="post-profile"
              className="rounded-full w-9 h-9 md:w-10 md:h-10"
            />
            <div className="flex flex-col">
              <h4 className="italic font-bold text-md text-Dark-soft md:text-base">
                {post.user.name}
              </h4>
              <div className="flex items-center gap-x-2">
                <span
                  className={`${
                    post.user.verified ? "bg-[#36B37E]" : "bg-red-500"
                  } w-fit bg-opacity-20 p-1.5 rounded-full`}
                >
                  {post.user.verified ? (
                    <BsCheckLg className="w-1.7 h-1.8 text-[#36B37E]" />
                  ) : (
                    <AiOutlineClose className="w-1.7 h-1.8 text-red-500" />
                  )}
                </span>
                <span className="text-xs italic text-Dark-light md:text-sm ">
                  {post.user.verified ? "Verified" : "Unverified"} writer
                </span>
              </div>
            </div>
          </div>
          <span className="text-sm italic font-bold text-Dark-light md:text-base">
            {new Date(post.createdAt).getDate()}{" "}
            {new Date(post.createdAt).toLocaleString("default", {
              month: "long",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
