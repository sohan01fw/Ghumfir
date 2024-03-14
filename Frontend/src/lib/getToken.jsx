import React, { useEffect, useState } from "react";
import { Token } from "./Token";
import { getAccessToken } from "./Actions/ServerGetActions/getAccessToken";
import { useAppState } from "../utils/Hooks/useAppState";

const getToken = () => {
  const { dispatch } = useAppState();
  useEffect(() => {
    const token = Token();
    if (!token) {
      getAccessToken();
    }
    const t = {
      type: "set-token",
      payload: token,
    };
    dispatch(t);
  }, []);
  return;
};

export default getToken;
