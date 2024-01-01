// eslint-disable-next-line
import React, { Children, useEffect, useState } from "react";
// eslint-disable-next-line
import { Link } from "react-router-dom";

const NavItemCollapse = ({
  children,
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
    <div className="min-h-0 py-2 rounded-none d-collapse bg-base-200 d-collapse-arrow">
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
        className={`flex items-center min-h-0 py-0 pl-0 text-lg font-medium d-collapse-title gap-x-2 ${
          name === activeNavName
            ? "font-bold text-primary"
            : "font-semibold text-[#a5a5a5]"
        }`}
      >
        {icon}
        {title}
      </div>
      <div className="d-collapse-content">
        <div className="flex flex-col mt-2 gap-y-2">{children}</div>
      </div>
    </div>
  );
};

export default NavItemCollapse;
