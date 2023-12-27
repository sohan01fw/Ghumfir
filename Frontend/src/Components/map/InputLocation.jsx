import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import "./InputLocation.css";
const InputLocation = () => {
  const {
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete();
  const handleSelect =
    ({ description }) =>
    () => {
      setValue(description, false);
      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log("📍 Coordinates: ", { lat, lng });
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search Places"
        className="input-location"
      />

      {/* Render dropdown  */}
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};
export default InputLocation;
