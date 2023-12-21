import { useState } from "react";

const Itineraries = ({ itinerary, selectedDay, handleAddPlace }) => {
  const [newPlace, setNewPlace] = useState("");

  return (
    <div>
      <h3>{`Day ${selectedDay} Itinerary`}</h3>
      <ul>
        {itinerary.map((place, placeIndex) => (
          <li key={placeIndex}>{place}</li>
        ))}
      </ul>
      <form>
        <label>
          Place to Visit:
          <input
            type="text"
            value={newPlace}
            onChange={(e) => setNewPlace(e.target.value)}
          />
          <button type="button" onClick={handleAddPlace}>
            Add
          </button>
        </label>
      </form>
    </div>
  );
};

export default Itineraries;