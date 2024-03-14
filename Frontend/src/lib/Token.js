import Cookies from "js-cookie";

export function Token() {
  const accessToken = Cookies.get("_at");
  return accessToken;
}
