import { Link, useLocation } from "react-router-dom";

import './SideBar.css';

const SideBar = () => {
    const location = useLocation();
  return (
    <div className="sidebar">
      <h3>Trip Details</h3>
      <ul>
        <li className={!location.hash || location.hash === "#places" ? "active" : ""}>
          <Link to="/tripDetails#places">Places to Visit</Link>
        </li>
        <li className={location.hash === "#itineraries" ? "active" : ""}>
          <Link to="/tripDetails#itineraries">Itineraries</Link>
        </li>

        <li className={location.hash === "#budget"? "active" : ""}>
          <Link to="/tripDetails#budget">Budget</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
