import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";

import "./MainNavigation.css";

const MainNavigation = () => {
    return (
        <header className="main-navigation__header">

            <h1 className="main-navigation__title">
                <Link to = "/" > Ghumfir </Link>
            </h1>
    
            <nav className="main-navigation__header-nav">
               <NavLinks />
            </nav>
          
        </header>

    );
};

export default MainNavigation;