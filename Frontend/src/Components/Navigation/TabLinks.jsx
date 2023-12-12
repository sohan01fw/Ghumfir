import { Link } from "react-router-dom";

const TabLinks = () => {
  return (
    <ul>
      <li>
        <Link to="/tripDetails/places"> Places to Visit</Link>
      </li>
      <li>
        <Link to="/tripDetails/itineraries"> Itineraries</Link>
      </li>
      <li>
        <Link to="/tripDetails/budget"> Budget </Link>
      </li>
    </ul>
  );
};

export default TabLinks;
