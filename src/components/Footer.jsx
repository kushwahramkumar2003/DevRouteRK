import React from "react";
import { images } from "../constants";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiOutlineYoutube } from "react-icons/ai";
import { AiOutlineLinkedin, AiFillHeart } from "react-icons/ai";
import { BsTelegram } from "react-icons/bs";
const Footer = () => {
  return (
    <section className="bg-Dark-hard">
      <footer className="container grid grid-cols-10 px-5 py-10 mx-auto gap-y-10 gap-x-5 md:pt-20 md:grid-cols-12 lg:grid-cols-10 lg:gap-x-10">
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="font-bold text-Dark-light md:text-lg">Product</h3>
          <ul className="text-[#959EAD] text-sm mt-5 space-y-4 md:text-base">
            <li>
              <a href="/">LandingPage</a>
            </li>
            <li>
              <a href="/">Features</a>
            </li>
            <li>
              <a href="/">Documentation</a>
            </li>
            <li>
              <a href="/">Referral Program</a>
            </li>
            <li>
              <a href="/">Pricing</a>
            </li>
          </ul>
        </div>
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="font-bold text-Dark-light md:text-lg">Services</h3>
          <ul className="text-[#959EAD] text-sm mt-5 space-y-4 md:text-base">
            <li>
              <a href="/">Documentation</a>
            </li>{" "}
            <li>
              <a href="/">Design</a>
            </li>{" "}
            <li>
              <a href="/">Themes</a>
            </li>{" "}
            <li>
              <a href="/">Illustrations</a>
            </li>
            <li>
              <a href="/">UI Kit</a>
            </li>
          </ul>
        </div>
        <div className="col-span-5 md:col-span-4 md:col-start-5 lg:col-span-2 lg:col-start-auto">
          <h3 className="font-bold text-Dark-light md:text-lg">Company</h3>
          <ul className="text-[#959EAD] text-sm mt-5 space-y-4 md:text-base">
            <li>
              <a href="/">About</a>
            </li>{" "}
            <li>
              <a href="/">Terms</a>
            </li>{" "}
            <li>
              <a href="/">Privacy Policy</a>
            </li>{" "}
            <li>
              <a href="/">Careers</a>
            </li>
          </ul>
        </div>
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="font-bold text-Dark-light md:text-lg">More</h3>
          <ul className="text-[#959EAD] text-sm mt-5 space-y-4 md:text-base">
            <li>
              <a href="/">Documentation</a>
            </li>{" "}
            <li>
              <a href="/">License</a>
            </li>{" "}
            <li>
              <a href="/">Changelog</a>
            </li>{" "}
          </ul>
        </div>
        <div className="col-span-10 md:order-first md:col-span-4 lg:col-span-2 ">
          <img
            src={images.Logo}
            alt="Logo"
            className="h-auto mx-auto w-14 brightness-0 invert md:mx-0"
          />
          <p className="text-sm text-center text-Dark-light md:text-left md:text-base lg:text-sm">
            Build a modern and creative website with crealand
          </p>
          <ul className="flex items-center justify-center mt-5 space-x-4 text-gray-300 md:justify-start">
            <li>
              <a href="/">
                <AiOutlineTwitter className="w-6 h-auto" />
              </a>
            </li>
            <li>
              <a href="/">
                <AiOutlineYoutube />
              </a>
            </li>
            <li>
              <a href="/">
                <AiOutlineInstagram />
              </a>
            </li>
            <li>
              <a href="/">
                <BsTelegram />
              </a>
            </li>
            <li>
              <a href="/">
                <AiOutlineLinkedin />
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-col items-center hidden space-y-4 md:flex md:col-span-12 lg:col-span-10">
          <div className="p-3 text-white rounded-full bg-primary">
            <AiFillHeart className="h-auto w-7" />
          </div>
          <p className="italic font-bold text-Dark-light">
            Copyright © 2023. Crafted with love.
          </p>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
