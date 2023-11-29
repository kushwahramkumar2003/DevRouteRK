import React from "react";
import { images } from "../../../constants";

const CTA = () => {
  return (
    <>
      <svg
        className="w-full h-auto translate-y-[1px] max-h-40"
        preserveAspectRatio="none"
        viewBox="0 0 2160 263"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="Wave"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2160 262.5H0V0C360 80 720 120 1080 120C1440 120 1800 80 2160 0V262.5Z"
          fill="#0D2436"
        />
      </svg>
      <section className="relative px-5 bg-Dark-hard">
        <div className="container grid grid-cols-12 py-10 mx-auto md:pb-20 lg:place-items-center">
          <div className="col-span-12 lg:col-span-6">
            <h2 className="text-2xl font-bold text-white font-roboto md:text-4xl md:text-center md:leading-normal lg:text-left">
              Get out stories delivered From us to your inbox weekly.
            </h2>
            <div className="w-full max-w-[494px] mt-12 space-y-3 mx-auto md:space-y-0 md:flex md:items-center md:space-x-2 lg:mx-0">
              <input
                type="text"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-lg placeholder:text-Dark-light"
              />
              <button className="w-full px-4 py-3 font-bold text-white rounded-lg bg-primary md:w-fit md:whitespace-nowrap">
                Get started
              </button>
            </div>
            <p className="mt-6 leading-7 text-md text-Dark-light md:text-center md:text-base lg:text-left">
              <span className="italic font-bold text-[#B3BAC5] md:not-italic md:font-normal md:text-Dark-light">
                Get a response tomorrow
              </span>{" "}
              if you submit by 9pm today.If we received after 9pm will get a
              response the following day.
            </p>
          </div>
          <div className="hidden col-span-12 mb-[70px] md:block md:order-first lg:order-last lg:col-span-6">
            <div className="relative w-3/4 mx-auto">
              <div className="w-1/2 h-1/2 bg-[#FC5A5A] rounded-lg absolute top-[10%] -right-[8%]"></div>
              <div className="w-1/2 h-1/2 bg-white rounded-lg absolute -left-[8%] -bottom-[10%] opacity-[0.06]"></div>
              <div className={`rounded-xl w-full bg-white p-3 z-[1] relative`}>
                <img
                  src={images.CtaImage}
                  alt="title"
                  className="object-cover object-center w-full h-auto md:h-52 lg:h-48 xl:h-[15rem] 2xl:h-[17rem]"
                />
                <div className="p-5 ">
                  <h2 className="text-xl font-bold font-roboto text-Dark-soft md:text-2xl lg:text-[28px] ">
                    Future of work
                  </h2>
                  <p className="mt-3 text-md text-Dark-light md:text-lg">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Suscipit, dolore?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTA;
