import React, { useState } from "react";

const PlacesToVisit = ({ handleAddPlace }) => {
  const [newPlace, setNewPlace] = useState("");

  const handleClick = () => {
    handleAddPlace(newPlace);
    setNewPlace("");
  }
  return (
    <div>
      <h2>Places to Visit</h2>
      <form>
        <label>
          Places to Visit:
          <input
            type="text"
            value={newPlace}
            onChange={(e) => setNewPlace(e.target.value)}
          />
          <button type="button" onClick={handleClick}>
            Add
          </button>
        </label>
      </form> 
    </div>
  );
};

export default PlacesToVisit;
