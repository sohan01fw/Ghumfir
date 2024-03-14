import React, { useEffect, useState } from "react";
import { Token } from "./Token";
import { getAccessToken } from "./Actions/ServerGetActions/getAccessToken";

const getToken = () => {
  const [value, setvalue] = useState();
  useEffect(() => {
    const token = Token();
    if (!token) {
      getAccessToken();
    }
    setvalue(token);
  }, []);
  return value;
};

export default getToken;
