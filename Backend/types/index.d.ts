import { ObjectId } from "mongodb";

export type User = {
  userId: string;
  email: string;
  name: string;
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

type itiPic = {
  url: string;
  height: number;
  width: number;
};
type userReviews = {
  author: string;
  author_url: string;
  text: string;
};

export type AllItiDetails = {
  user: ObjectId;
  ItiDetails: {
    address: string;
    business_status: string;
    name: string;
    photos: Array<itiPic>;
    place_id: string;
    rating: number;
    reviews: Array<userReviews>;
    user_total_rating: number;
  };
};
