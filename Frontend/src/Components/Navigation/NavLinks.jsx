import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = () => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/"> Trips </NavLink>
      </li>
      <li>
        <NavLink to="/about"> About </NavLink>
      </li>
      {/* <li>
        <NavLink to="/contact"> Contact </NavLink>
      </li> */}
    </ul>
  );
};

export default NavLinks;
