import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./AllRoutes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { ValidateUser } from "./redux/action/auth";
import { getSildeImage } from "./redux/action/slideShow";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSildeImage());
    dispatch(ValidateUser());
  }, [dispatch]);

  return (
    <div className="App bg-gray-50 dark:bg-gray-800 dark:text-white">
      <Router>
        <AllRoutes />
      </Router>
    </div>
  );
}

export default App;
