export type User = {
  userId: string;
  email: string;
  name: string;
  itineraries: Array<Itineraries>;
};

export type Itineraries = {
  itineraryId: string;
  location: string;
  startDate: string;
  endDate: string;
};
