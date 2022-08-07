import { useLocation } from "react-router-dom";
import "url-search-params-polyfill";

export default () => {
  return new URLSearchParams(useLocation().search);
};
