import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavItemCollapse = ({
  content,
  title,
  icon,
  name,
  activeNavName,
  setActiveNavName,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect((): void => {
    if (activeNavName !== name) {
      setIsChecked(false);
    }
  }, [activeNavName, name]);

  return (
    <div className="min-h-0 py-2 rounded-none collapse bg-base-200 collapse-arrow">
      <input
        type="checkbox"
        className="min-h-0 py-0"
        checked={name === activeNavName}
        onChange={(): void => {
          setActiveNavName(name);
          setIsChecked(!isChecked);
        }}
      />
      <div
        className={`flex items-center min-h-0 py-0 pl-0 text-lg font-medium collapse-title gap-x-2 ${
          name === activeNavName
            ? "font-bold text-primary"
            : "font-semibold text-[#a5a5a5]"
        }`}
      >
        {icon}
        {title}
      </div>
      <div className="collapse-content">
        <div className="flex flex-col mt-2 gap-y-2">
          {content.map((item): Element | any => (
            <Link to={item.link} key={item.title}>
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavItemCollapse;