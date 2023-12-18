import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";
import { AiFillDashboard, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import images from "../../../../constants/images";
import { FaComments } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import NavItem from "./NavItem.tsx";
import NavItemCollapse from "./NavItemCollapse.tsx";

const MENU_ITEMS = [
  {
    title: "Dashboard",
    link: "/admin",
    icon: <AiFillDashboard className="text-xl" />,
    name: "dashboard",
    type: "link",
  },
  {
    title: "Comments",
    link: "/admin/comments",
    icon: <FaComments className="text-xl" />,
    name: "comments",
    type: "link",
  },
  {
    title: "Posts",
    content: [
      { title: "New", link: "/admin/posts/new" },
      { title: "Manage", link: "/admin/posts/manage" },
    ],
    icon: <MdDashboard className="text-xl" />,
    name: "posts",
    type: "collapse",
  },
];

const Header = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeNavName, setActiveNavName] = useState("dashboard");
  const windowSize = useWindowSize();

  const toggleMenuHandler = (): void => {
    setIsMenuActive((prev): boolean => !prev);
  };

  useEffect((): void => {
    if (windowSize?.width < 1024) {
      setIsMenuActive(false);
    } else {
      setIsMenuActive(true);
    }
  }, [windowSize?.width]);

  return (
    <header className="flex items-center justify-between w-full h-fit lg:h-full lg:max-w-[300px] lg:flex-col lg:items-start lg:justify-start lg:p-0">
      {/* logo  */}

      <Link to={""}>
        <img className="w-16 lg:hidden " src={images.Logo} alt="logo" />
      </Link>
      {/* menu burger icon  */}

      <div className="cursor-pointer lg:hidden">
        {isMenuActive ? (
          <AiOutlineClose className="w-6 h-6" onClick={toggleMenuHandler} />
        ) : (
          <AiOutlineMenu className="w-6 h-6" onClick={toggleMenuHandler} />
        )}
      </div>
      {/* sidebar container  */}

      {isMenuActive && (
        <div className="fixed inset-0 lg:static lg:h-full lg:w-full">
          {/* underlay  */}

          <div
            className="fixed inset-0 bg-black opacity-50 lg:hidden"
            onClick={toggleMenuHandler}
          />
          {/* sidebar  */}

          <div className="fixed top-0 bottom-0 left-0 z-50 w-3/4 p-4 overflow-y-auto bg-white lg:static lg:h-full lg:w-full lg:p-6">
            <Link to={"/"}>
              <img src={images.Logo} alt="logo" className="w-16" />
            </Link>
            <h4 className="mt-10 font-bold text-[#C7C7C7]">Main Menu</h4>
            {/* Menu items  */}

            <div className="flex flex-col mt-6 gap-y-[0.563rem]">
              {MENU_ITEMS.map((item, index) =>
                item.type === "link" ? (
                  <NavItem
                    title={item.title}
                    link={item.link}
                    icon={item.icon}
                    name={item.name}
                    activeNavName={activeNavName}
                    setActiveNavName={setActiveNavName}
                    key={item.title}
                  />
                ) : (
                  <NavItemCollapse
                    title={item.title}
                    content={item.content}
                    icon={item.icon}
                    name={item.name}
                    activeNavName={activeNavName}
                    setActiveNavName={setActiveNavName}
                    key={item.title}
                  />
                )
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
