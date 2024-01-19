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

type itiPic = {};
type userReviews = {
  author_name: string;
  author_pic_url: string;
  text: string;
  rating: Number;
};

export type AllItiDetails = {
  itineraryId: string;
  ItiDetails: Array<{
    address: string;
    business_status: string;
    name: string;
    photos: Array<itiPic>;
    place_id: string;
    rating: number;
    reviews: Array<userReviews>;
    user_total_rating: number;
  }>;
};
