import React from "react";
import { Link } from "react-router-dom";
import { images } from "../../../constants";

const SuggestedPosts = ({ classname, header, posts, tags }) => {
  return (
    <div
      className={`w-full shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] rounded-lg p-4 ${classname}`}
    >
      <h2 className="font-medium font-roboto text-Dark-hard md:text-xl">
        {header}
      </h2>
      <div className="grid mt-5 gap-y-5 md:grid-cols-2 md:gap-x-5 lg:grid-cols-1 lg:text-lg">
        {posts.map((item, index) => {
          return (
            <div
              key={item._id}
              className="flex items-center space-x-3 flex-nowrap "
            >
              <img
                src={item?.photo ? item.photo : images.Sample}
                alt={item?.title}
                className="object-cover w-1/5 rounded-lg aspect-square"
              />
              <div className="text-sm font-medium font-roboto text-Dark-hard">
                <h3 className="text-sm font-medium md:text-base font-roboto text-Dark-hard">
                  <Link to={`/blog/${item?.slug}`}>{item.title}</Link>
                </h3>
                <span className="text-xs opacity-60">
                  {new Date(item.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <h2 className="mt-8 font-medium font-roboto text-Dark-hard md:text-xl">
        Tags
      </h2>
      {tags.length === 0 ? (
        <p className="mt-2 text-xs text-slate-500">
          There is no tags for this post.
        </p>
      ) : (
        <div className="flex flex-wrap mt-4 gap-x-2 gap-y-2">
          {tags.map((item, index) => {
            return (
              <Link
                key={index}
                to={"/"}
                className="inline-block px-3 rounded-md py-1.5 bg-primary font-roboto text-xs text-white md:text-sm"
              >
                {item}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SuggestedPosts;
