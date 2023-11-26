import React from "react";
import { images } from "../constants";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const menuItems = ["Home", "Articles", "Pages", "Pricing", "Faq"];

const NavItem = ({ name }) => {
  return (
    <li className=" relative group">
      <a href="/" className="px-4 py-2 ">
        {name}
      </a>
      <span className="text-blue-500 absolute transition-all duration-500 font-bold right-0 top-0  group-hover:right-[90%] opacity-0 group-hover:opacity-100">
        /
      </span>
    </li>
  );
};

const Header = () => {
  const [navIsVisible, setNavIsVisible] = React.useState(true);

  const navVisibilityHandler = () => {
    setNavIsVisible((prev) => !prev);
  };
  return (
    <section>
      <header className="container mx-auto px-5 flex justify-between py-4 items-center">
        <div>
          <img src={images.Logo} alt="" className="w-20" />
        </div>
        <div>
          {navIsVisible ? (
            <AiOutlineClose
              className="w-6 h-6"
              onClick={navVisibilityHandler}
            />
          ) : (
            <AiOutlineMenu className="w-6 h-6" onClick={navVisibilityHandler} />
          )}
        </div>
        <div
          className={`${
            navIsVisible ? "right-0" : "-right-full"
          } fixed  top-0 bottom-0 lg:static flex flex-col lg:flex-row  gap-x-9 items-center justify-center lg:justify-end w-full lg:w-auto`}
        >
          <ul className="flex gap-x-2 font-semibold">
            {menuItems.map((item, index) => (
              <NavItem key={index} name={item} />
            ))}
          </ul>
          <button className="border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300">
            Sign Up
          </button>
        </div>
      </header>
    </section>
  );
};

export default Header;
