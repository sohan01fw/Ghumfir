import { Link } from "react-router-dom";

const SideBar = () => {
    return (
        <div className="sidebar">
            <h3>Trip Details</h3>
            <ul>
                <li>
                    <Link to="/places">Places to Visit</Link>
                </li>
                <li>
                    <Link to="/itineraries">Itineraries</Link>
                </li>
                <li>
                    <Link to="/budget">Budget</Link>
                </li>

            </ul>
        </div>
    );
};

export default SideBar;