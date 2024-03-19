import { ObjectId } from "mongodb";
import { Types } from "mongoose";

export type User = {
  userId: string;
  email: string;
  name?: string;
  password: string;
  refreshToken: string;
};

//it's for all details model
type itiPic = {
  url: string;
  height: string;
  width: string;
};
type userReviews = {
  author_name: string;
  author_pic_url: string;
  text: string;
  rating: Number;
};

export type AllItiDetails = {
  userId: Types.ObjectId;
  itineraryId: string;
  ItiDetails: Array<{
    place_itiid: string;
  }>;
};

//type for places model
export type Places = {
  user: Types.ObjectId;
  AllPlaces: Array<{
    places_Id: string;
    startDate: string;
    endDate: string;
    places: Array<{
      itineraryId: string;
      itiPlaces: Array<{
        itineraryId: string;
        itiInfo: {
          place_Id: string;
          place: string;
          images: Array<{}>;
          geolocation: {
            lat: string;
            lng: string;
          };
        };
      }>;
    }>;
  }>;
};
