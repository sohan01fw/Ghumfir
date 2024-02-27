import { useContext } from "react";
import { AppContext } from "../../Store/Reducer";

export const useAppState = () => {
  const { state, dispatch } = useContext(AppContext);
  return { state, dispatch };
};
