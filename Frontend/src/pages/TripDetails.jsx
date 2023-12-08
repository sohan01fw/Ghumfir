// import GoogleMap from "../Components/map/GoogleMap";
import { useTripForm } from "../Contexts/TripFormContext";

const TripDetails = () => {
  const { tripData } = useTripForm();
  const { destination, startDate, endDate } = tripData;

  return (
    <div>
      <h2>Trip Details</h2>
      <p>Destination: {destination}</p>
      <p>Start Date: {startDate && startDate.toLocaleDateString()}</p>
      <p>End Date: {endDate && endDate.toLocaleDateString()}</p>

      {/* Additional content */}

      <div className="map">
        {/* <GoogleMap /> */}
        {/* You can uncomment the GoogleMap component when it's ready */}
      </div>

      <div>
        <form>
          <label>
            Places to Visit:
          </label>
          <input />
        </form>
      </div>
    </div>
  );
};

export default TripDetails;
