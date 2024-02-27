import { key } from "../exportItem";
import { useJsApiLoader } from "@react-google-maps/api";

export const useMapLoader = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: key,
  });
  return { isLoaded };
};
