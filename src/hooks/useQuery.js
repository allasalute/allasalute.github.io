import { useLocation } from "react-router-dom";
import "url-search-params-polyfill";

function Location() {
  let location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  return searchParams;
}

export default Location;
