import React from "react";
import { images } from "../constants";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";

const navItemsInfo = [
  { name: "Home", type: "link" },
  { name: "Articles", type: "link" },
  { name: "Pages", type: "dropdown", items: ["About us", "Contact us"] },
  { name: "Pricing", type: "link" },
  { name: "Faq", type: "link" },
];

const NavItem = ({ item }) => {
  return (
    <li className="relative group">
      {item.type === "link" ? (
        <>
          <a href="/" className="px-4 py-2 ">
            {item.name}
          </a>
          <span className="text-blue-500 absolute transition-all duration-500 font-bold right-0 top-0  group-hover:right-[90%] opacity-0 group-hover:opacity-100">
            /
          </span>
        </>
      ) : (
        <>
          <a href="/" className="flex items-center px-4 py-2 gap-x-1">
            <span> {item.name}</span>

            <MdKeyboardArrowDown className="w-4 h-4" />
          </a>
          <div className="absolute bottom-0 right-0 hidden pt-4 transition-all duration-500 transform translate-y-full group-hover:block w-max">
            <ul className="flex flex-col overflow-hidden rounded-lg shadow-lg">
              {item.items.map((page) => {
                return (
                  // <li className="px-4 py-2 text-Dark-soft hover:text-blue-500">
                  <a
                    href="/"
                    className="px-4 py-2 text-white hover:bg-Dark-hard hover:text-white lg:text-Dark-soft"
                  >
                    {page}
                  </a>
                  // </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
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
      <header className="container flex items-center justify-between px-5 py-4 mx-auto">
        <div>
          <img src={images.Logo} alt="" className="w-20" />
        </div>
        <div className="z-50 lg:hidden ">
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
          } z-[49] fixed  top-0 bottom-0 lg:static flex flex-col lg:flex-row  
          gap-x-9 items-center justify-center lg:justify-end w-full lg:w-auto bg-Dark-hard lg:bg-transparent 
          mt-[100px] lg:mt-0 transition-all duration-300`}
        >
          <ul className="flex flex-col items-center font-semibold text-white gap-x-2 lg:flex-row lg:text-Dark-soft gap-y-5">
            {navItemsInfo.map((item, index) => (
              <NavItem key={index} item={item} />
            ))}
          </ul>
          <button className="px-6 py-2 mt-5 font-semibold text-blue-500 transition-all duration-300 border-2 border-blue-500 rounded-full hover:bg-blue-500 hover:text-white lg:mt-0">
            Sign Up
          </button>
        </div>
      </header>
    </section>
  );
};

export default Header;
