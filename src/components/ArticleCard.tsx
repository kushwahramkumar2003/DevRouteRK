import React from "react";
import { images } from "../constants";
import { BsCheckLg } from "react-icons/bs";

const ArticleCard = ({ className }) => {
  return (
    <div
      className={`overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] rounded-xl ${className}`}
    >
      <img
        src={images.Post1Image}
        alt="title"
        className="object-cover object-center w-full h-auto md:h-52 lg:h-48 xl:h-[15rem] 2xl:h-[17rem]"
      />
      <div className="p-5 ">
        <h2 className="text-xl font-bold font-roboto text-Dark-soft md:text-2xl lg:text-[28px]">
          Future of work
        </h2>
        <p className="mt-3 text-md text-Dark-light md:text-lg">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit,
          dolore?
        </p>
        <div className="flex items-center justify-between mt-6 flex-nowrap">
          <div className="flex items-center gap-x-2 md:gap-x-2.5">
            <img
              src={images.PostProfileImage}
              alt="post-profile"
              className="w-9 h-9 md:w-10 md:h-10"
            />
            <div className="flex flex-col">
              <h4 className="italic font-bold text-md text-Dark-soft md:text-base">
                Ramkumar
              </h4>
              <div className="flex items-center gap-x-2">
                <span className="bg-[#36B37E] w-fit bg-opacity-20 p-1.5 rounded-full">
                  <BsCheckLg className="w-1.7 h-1.8 text-[#36B37E]" />
                </span>
                <span className="text-xs italic text-Dark-light md:text-sm ">
                  Verified writer
                </span>
              </div>
            </div>
          </div>
          <span className="text-sm italic font-bold text-Dark-light md:text-base">
            27 Nov
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
