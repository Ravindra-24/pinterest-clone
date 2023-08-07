import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./AllRoutes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { ValidateUser } from "./redux/action/auth";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ValidateUser());
  }, [dispatch]);
  return (
    <div className="App">
      <Router>
        <AllRoutes />
      </Router>
    </div>
  );
}

export default App;
