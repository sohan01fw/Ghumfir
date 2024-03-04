import { Link, useLocation } from "react-router-dom";

import "./SideBar.css";

const SideBar = ({ itiId }) => {
  const location = useLocation();

  const scrollToSection = (hash) => {
    const targetElement = document.getElementById(hash.slice(1));
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sidebar">
      <ul>
        <li
          className={
            !location.hash || location.hash === "#overview" ? "active" : ""
          }
        >
          <Link>OverView</Link>
        </li>
        <li className={location.hash === "#explore" ? "active" : ""}>
          <Link>Explore</Link>
        </li>
        <li className={location.hash === "#notes" ? "active" : ""}>
          <Link>Notes</Link>
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

export default SideBar;
