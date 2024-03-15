import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useAppState } from "../utils/Hooks/useAppState";

const useToken = () => {
  const { state, dispatch } = useAppState();

  useEffect(() => {
    const token = Cookies.get("_at");
    const tt = {
      type: "set-token",
      payload: token,
    };
    dispatch(tt);
  }, []);

  return;
};

export default useToken;
