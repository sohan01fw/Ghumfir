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
      <li>
        <NavLink to="/tripDetails"> Trip Details </NavLink>
      </li>
      <li>
        <NavLink to="/Blog"> Blog </NavLink>
      </li>
      <li>
        <NavLink to="/auth"> Authenticate </NavLink>
      </li>

      {/* <li>
        <NavLink to="/contact"> Contact </NavLink>
      </li> */}
    </ul>
  );
};

export default NavLinks;
