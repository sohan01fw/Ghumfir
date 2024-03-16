import React from "react";
import { Link } from "react-router-dom";
import { SlBookOpen } from "react-icons/sl";
import { MdExplore } from "react-icons/md";
import { FaStickyNote } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { FaSackDollar } from "react-icons/fa6";
import "./IconSideBar.css";

const IconSideBar = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    console.log(element);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sidebar-container">
      <ul className="sidebar-list">
        <li>
          <Link onClick={() => scrollToSection("Overview")}>
            <SlBookOpen fontSize={20} />
          </Link>
        </li>
        <li>
          <Link onClick={() => scrollToSection("Explore")}>
            <MdExplore fontSize={20} />
          </Link>
        </li>

        <li>
          <Link onClick={() => scrollToSection("PlacesToVisit")}>
            <GoGoal fontSize={20} />
          </Link>
        </li>
        <li>
          <Link onClick={() => scrollToSection("budget")}>
            <FaSackDollar fontSize={20} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default IconSideBar;
