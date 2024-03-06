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
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sidebar-container">
      <ul className="sidebar-list">
        <li>
          <Link to="#Overview" onClick={() => scrollToSection("overview")}>
            <SlBookOpen fontSize={20} />
          </Link>
        </li>
        <li>
          <Link to="#Explore" onClick={() => scrollToSection("explore")}>
            <MdExplore fontSize={20} />
          </Link>
        </li>
        <li>
          <Link to="#Note" onClick={() => scrollToSection("notes")}>
            <FaStickyNote fontSize={20} />
          </Link>
        </li>
        <li>
          <Link
            to="#Placet-to-visit"
            onClick={() => scrollToSection("placesToVisit")}
          >
            <GoGoal fontSize={20} />
          </Link>
        </li>
        <li>
          <Link to="#Budget" onClick={() => scrollToSection("budget")}>
            <FaSackDollar fontSize={20} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default IconSideBar;
