// import React, { useState } from "react";

// const PlacesToVisit = ({ handleAddPlace }) => {
//   const [newPlace, setNewPlace] = useState("");

//   const handleClick = () => {
//     handleAddPlace(newPlace);
//     setNewPlace("");
//   }
//   return (
//     <div>
//       <h2>Places to Visit</h2>
//       <form>
//         <label>
//           Places to Visit:
//           <input
//             type="text"
//             value={newPlace}
//             onChange={(e) => setNewPlace(e.target.value)}
//           />
//           <button type="button" onClick={handleClick}>
//             Add
//           </button>
//         </label>
//       </form>
//     </div>
//   );
// };

// export default PlacesToVisit;

// PlacesToVisit.jsx
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import "./PlacesToVisit.css";
import DisplayPlaces from "../../lib/Map/DisplayPlaces";

const PlacesToVisit = ({locations, handleAddLocation, handleDeleteLocation}) => {
  // const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);


  const handleInputChange = (e) => {
    setNewLocation(e.target.value);
  };

  // const handleAddLocation = (newLocationInfo) => {
  //   if (newLocation.trim() !== "") {
  //     // const newLocationInfo = {
  //     //   // id: Date.now(),
  //     //   // name: newLocation,
  //     //   // description:
  //     //   //   "A wonderful place to visit! lorem ipsum lajflkjals jfalsjfla yadf alakflajsf ",
  //     //   // image: "https://via.placeholder.com/200",
  //     // };
  //     setLocations([...locations, newLocationInfo]);


  //     // setLocations([...locations, newLocationInfo]);
  //     setNewLocation("");
  //   }
  // };


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      className={`places-to-visit ${isDropdownOpen ? "open" : ""}`}
      id="placesToVisit"
    >
      <div className="dropdown-header" onClick={toggleDropdown}>
        <h2>Places To Visit</h2>
        <FontAwesomeIcon icon={isDropdownOpen ? faAngleUp : faAngleDown} />
      </div>

      <div className="dropdown-content">
        <div className="add-place-section">
          <h3>Add a Place</h3>
          <div className="input-section">
            <input
              type="text"
              placeholder="Location Name"
              value={newLocation}
              onChange={handleInputChange}
            />
            <button onClick={handleAddLocation}>Add Location</button>
          </div>
    <div>
    <DisplayPlaces handleAddLocation = {handleAddLocation} handleDeleteLocation={handleDeleteLocation} />

    </div>
        </div>
        <div className="location-list">
          {locations.map((location) => (
            <div className="location-item" key={location.id}>
              <div className="location-item-info">
                <h3>{location.name}</h3>
                <p>{location.description}</p>
              </div>
              <div className="location-item-img">
                {location.image && <img src={location.image} alt={location.name} />}
              </div>
              <div className="delete">
                <button onClick={() => handleDeleteLocation(location.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlacesToVisit;
