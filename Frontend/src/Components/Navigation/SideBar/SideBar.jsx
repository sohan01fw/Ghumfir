import { Link, useLocation } from "react-router-dom";

import './SideBar.css';

const SideBar = ({itiId}) => {
    const location = useLocation();

    const scrollToSection = (hash) => {
      const targetElement = document.getElementById(hash.slice(1));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    };

  return (
    <div className="sidebar">
      <h3>Trip Details</h3>
      <ul>
      <li  className={!location.hash || location.hash === "#overview" ? "active" : ""}>
          <Link to={`/tripDetails/${itiId}#overview`} onClick = {() => scrollToSection('#overview')}>OverView</Link>
        </li>
        <li className={location.hash === "#explore" ? "active" : ""}>
          <Link to={`/tripDetails/${itiId}#explore`} onClick = {() => scrollToSection('#explore')}>Explore</Link>
        </li>
        <li className={location.hash === "#notes" ? "active" : ""}>
          <Link to={`/tripDetails/${itiId}#notes`} onClick = {() => scrollToSection('#notes')}>Notes</Link>
        </li>
        <li className={location.hash === "#placesToVisit" ? "active" : ""}>
          <Link to={`/tripDetails/${itiId}#placesToVisit`} onClick = {() => scrollToSection('#placesToVisit')}>Places To Visit</Link>
        </li>
        <li className={location.hash === "#budget" ? "active" : ""}>
          <Link to={`/tripDetails/${itiId}#budget`} onClick = {() => scrollToSection('#budget')}>Budget</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
