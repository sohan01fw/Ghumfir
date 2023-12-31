export type User = {
  userId: string;
  email: string;
  name: string;
  itineraries: Array<Itineraries>;
};

export type Itineraries = {
  itineraryId: string;
  itiInfo: {
    place_Id: string;
    place: string;
    geolocation: {
      lat: string;
      lng: string;
    };
  };
  startDate: string;
  endDate: string;
};
