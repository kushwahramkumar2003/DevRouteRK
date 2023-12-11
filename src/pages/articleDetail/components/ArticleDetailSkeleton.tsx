import React from "react";

import { BiImageAlt } from "react-icons/bi";

const ArticleDetailSkeleton = () => {
  return (
    <section className="container flex flex-col max-w-5xl px-5 py-5 mx-auto lg:flex-row lg:gap-x-5 lg:items-start animate-pulse">
      <article className="flex-1">
        {/* post image */}
        <div className="flex items-center justify-center w-full rounded-xl aspect-video bg-slate-300">
          <BiImageAlt className="text-4xl text-slate-400" />
        </div>
        {/* title */}
        <div className="mt-4 md:text-[26px] w-2/5 h-2 rounded-lg bg-slate-400" />
        <div className="mt-4 prose-sm prose sm:prose-base">
          <p className="w-1/2 h-2 mt-6 rounded-lg bg-slate-300"></p>
          <p className="w-full h-2 mt-4 rounded-lg bg-slate-300"></p>
          <p className="w-[70%] h-2 mt-4 rounded-lg bg-slate-300"></p>
          <p className="w-4/5 h-2 mt-4 rounded-lg bg-slate-300"></p>
        </div>
      </article>

      {/* Suggested posts */}
      <div
        className={`w-full shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] rounded-lg p-4 mt-8 lg:mt-0 lg:max-w-xs`}
      >
        {/* title */}
        <div className="w-[20%] h-2 rounded-lg bg-slate-300" />
        <div className="grid mt-5 gap-y-5 md:grid-cols-2 md:gap-x-5 lg:grid-cols-1">
          {[...Array(6)].map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 flex-nowrap"
            >
              {/* image */}
              <div className="w-1/5 rounded-lg aspect-square bg-slate-300" />
              <div className="w-full">
                {/* post title */}
                <div className="w-full h-2 rounded-lg bg-slate-300" />
                <p className="w-[60%] h-2 mt-4 rounded-lg bg-slate-300"></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleDetailSkeleton;
