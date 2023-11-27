import React from "react";
import { FiSearch } from "react-icons/fi";
import { images } from "../../../constants";

const Hero = () => {
  return (
    <section className="container flex flex-col px-5 py-5 mx-auto lg:flex-row">
      <div className="mt-10 lg:w-1/2">
        <h1 className="text-3xl font-bold text-center font-roboto text-Dark-soft md:text-5xl lg:text-left lg:max-w-[540px]">
          Read the most interesting articles.
        </h1>
        <p className="mt-4 text-center text-Dark-light md:text-xl lg:text-left">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
          culpa quod pariatur hic iure repellat eos iste rem veniam voluptate.
        </p>
        <div className="flex flex-col gap-y-2.5 mt-10 relative ">
          <div className="relative ">
            <FiSearch className="absolute w-6 h-6 -translate-y-1/2 left-3 top-1/2 text-[#959eAD]" />
            <input
              type="text"
              className="font-semibold placeholder:bold text-Dark-soft placeholder:text-[#959ead] rounded-lg pl-12 pr-3 w-full py-3 focus:outline-none shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] md:py-4"
              placeholder="Search articles"
            />
          </div>
          <button className="w-full px-5 py-3 font-semibold text-white rounded-lg bg-primary md:absolute md:right-0 md:top-[7px] md:-translate-x-1/2 md:w-fit md:py-2">
            Search
          </button>
        </div>
        <div className="flex flex-col mt-4 lg:flex-row lg:flex-nowrap lg:gap-x-4 lg:mt-7 lg:items-start ">
          <span className="mt-2 italic font-semibold lg:mt-4 text-Dark-light ">
            Popular Tags:
          </span>
          <ul className="flex flex-wrap gap-x-2.5 gap-y-2.5 mt-3">
            <li className="px-3 rounded-lg bg-primary bg-opacity-10 py-1.5 text-primary font-semibold italic">
              Design
            </li>
            <li className="px-3 rounded-lg bg-primary bg-opacity-10 py-1.5 text-primary font-semibold italic">
              User Experience
            </li>
            <li className="px-3 rounded-lg bg-primary bg-opacity-10 py-1.5 text-primary font-semibold italic">
              User Interfaces
            </li>
          </ul>
        </div>
      </div>
      <div className="hidden lg:block lg:1/2">
        <img
          src={images.HeroImage}
          alt="users are reading articles"
          className="w-full "
        />
      </div>
    </section>
  );
};

export default Hero;
