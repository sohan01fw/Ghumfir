import React from "react";
import { Link } from "react-router-dom";
import { CalendarIcon, Search2Icon, StarIcon } from "@chakra-ui/icons";
import "./IconSideBar.css";
const IconSideBar = () => {
  return (
    <div className="sidebars">
      <ul>
        <li
          className={
            !location.hash || location.hash === "#overview" ? "active" : ""
          }
        >
          <Link>
            <StarIcon />
          </Link>
        </li>
        <li className={location.hash === "#explore" ? "active" : ""}>
          <Link>
            <Search2Icon />
          </Link>
        </li>
        <li className={location.hash === "#notes" ? "active" : ""}>
          <Link>
            <CalendarIcon />
          </Link>
        </li>
        <li className={location.hash === "#placesToVisit" ? "active" : ""}>
          <Link>Places To Visit</Link>
        </li>
        <li className={location.hash === "#budget" ? "active" : ""}>
          <Link>Budget</Link>
        </li>
      </ul>
    </div>
  );
};

export default IconSideBar;
