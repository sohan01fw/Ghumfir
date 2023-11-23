
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = () => {
    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact > Home </NavLink>
            </li>
            <li>
                <NavLink to="/about" exact > About </NavLink>
            </li>
            <li>
                <NavLink to="/contact" exact > Contact </NavLink>
            </li>

        </ul>
    );
};

export default NavLinks;