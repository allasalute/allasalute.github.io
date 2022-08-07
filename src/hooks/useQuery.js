import { useLocation } from "react-router-dom";
import "url-search-params-polyfill";

const App = props => {
  new URLSearchParams(useLocation().search);
};

export default App;
