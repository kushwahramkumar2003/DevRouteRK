import React, { useState } from "react";
import { images } from "../constants";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/actions/userActions";
import { Link, useNavigate } from "react-router-dom";

const navItemsInfo = [
  { name: "Home", type: "link", href: "/" },
  { name: "Articles", type: "link", href: "articles" },
  {
    name: "Pages",
    type: "dropdown",
    items: [
      { title: "About us", href: "/about" },
      { title: "Contact us", href: "/contact" },
    ],
  },
  { name: "Pricing", type: "link", href: "/pricing" },
  { name: "Faq", type: "link", href: "/faq" },
];

const NavItem = ({ item }) => {
  const [drowpDown, setDrowpDown] = React.useState(false);

  const dropdownHandler = () => {
    setDrowpDown((prev) => !prev);
  };
  return (
    <li className="relative group">
      {item.type === "link" ? (
        <>
          <Link to={item.href} className="px-4 py-2 ">
            {item.name}
          </Link>
          <span className="text-blue-500 absolute transition-all duration-500 font-bold right-0 top-0  group-hover:right-[90%] opacity-0 group-hover:opacity-100 cursor-pointer">
            /
          </span>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <button
            className="flex items-center px-4 py-2 gap-x-1"
            onClick={dropdownHandler}
          >
            <span> {item.name}</span>

            <MdKeyboardArrowDown className="w-4 h-4" />
          </button>
          <div
            className={`${
              drowpDown ? "block" : "hidden"
            } pt-4 transition-all duration-500 lg:translate-y-full lg:transform lg:right-0 lg:bottom-0 lg:group-hover:block w-max lg:hidden lg:absolute`}
          >
            <ul className="flex flex-col overflow-hidden text-center rounded-lg shadow-lg bg-Dark-soft lg:bg-transparent">
              {item.items.map((page, index) => {
                return (
                  // <li className="px-4 py-2 text-Dark-soft hover:text-blue-500">
                  <Link
                    to={page.href}
                    key={index}
                    className="px-4 py-2 text-white hover:bg-Dark-hard hover:text-white lg:text-Dark-soft"
                  >
                    {page.title}
                  </Link>
                  // </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [navIsVisible, setNavIsVisible] = React.useState(false);
  const userState = useSelector((state) => state.user);
  const [profileDrowpdown, setProfileDrowpdown] = useState(false);

  const navVisibilityHandler = () => {
    setNavIsVisible((prev) => !prev);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <section className="sticky top-0 left-0 right-0 z-50 bg-white">
      <header className="container flex items-center justify-between px-5 py-4 mx-auto">
        <Link to="/">
          <img src={images.Logo} alt="" className="w-20" />
        </Link>
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
          {userState.userInfo ? (
            <div className="flex flex-col items-center font-semibold text-white gap-x-2 lg:flex-row lg:text-Dark-soft gap-y-5">
              <div className="relative group">
                <div className="flex flex-col items-center">
                  <button
                    className="flex items-center px-4 px-6 py-2 mt-5 font-semibold text-blue-500 transition-all duration-300 border-2 border-blue-500 rounded-full gap-x-1 hover:bg-blue-500 hover:text-white lg:mt-0"
                    type="button"
                    onClick={() => setProfileDrowpdown(!profileDrowpdown)}
                  >
                    <span>Account</span>

                    <MdKeyboardArrowDown className="w-4 h-4" />
                  </button>
                  <div
                    className={`${
                      profileDrowpdown ? "block" : "hidden"
                    } pt-4 transition-all duration-500 lg:translate-y-full lg:transform lg:right-0 lg:bottom-0 lg:group-hover:block w-max lg:hidden lg:absolute`}
                  >
                    <ul className="flex flex-col overflow-hidden text-center rounded-lg shadow-lg bg-Dark-soft lg:bg-transparent">
                      {/* <li className="flex flex-col px-4 py-2 rounded-lg text-Dark-soft hover:text-blue-500"> */}
                      {userState?.userInfo?.admin && (
                        <button
                          type="button"
                          className="px-4 py-2 text-white hover:bg-Dark-hard hover:text-white lg:text-Dark-soft"
                          onClick={() => navigate("/admin")}
                        >
                          Admin Dashboard
                        </button>
                      )}

                      <button
                        type="button"
                        className="px-4 py-2 text-white hover:bg-Dark-hard hover:text-white lg:text-Dark-soft"
                        onClick={() => navigate("/profile")}
                      >
                        Profile Page
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 text-white hover:bg-Dark-hard hover:text-white lg:text-Dark-soft"
                        onClick={logoutHandler}
                      >
                        Logout
                      </button>
                      {/* </li> */}
                    </ul>
                  </div>


                  
                </div>
              </div>
            </div>
          ) : (
            <button
              className="px-6 py-2 mt-5 font-semibold text-blue-500 transition-all duration-300 border-2 border-blue-500 rounded-full hover:bg-blue-500 hover:text-white lg:mt-0"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          )}
        </div>
      </header>
    </section>
  );
};

export default Header;
