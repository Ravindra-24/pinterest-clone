import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./AllRoutes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ValidateUser, oneTapLogin } from "./redux/action/auth";
import { getSildeImage } from "./redux/action/slideShow";
import { SearchProvider } from "./context/searchContext";
import { ModalProvider } from "./context/ModalContext.jsx";
import { useGoogleOneTapLogin } from "@react-oauth/google";

function App() {
  const dispatch = useDispatch();
  const [authState, setAuthState] = useState(true);
  const currentUser = useSelector((state) => state.authReducer);

  useGoogleOneTapLogin({
    disabled: authState,
    autoSelect: true,
    prompt: "consent",
    onSuccess: (CredentialResponse) => {
      console.log("one tap success", CredentialResponse);
      dispatch(oneTapLogin(CredentialResponse));
    },
    onError: (error) => {
      console.log("one tap error", error);
    },
    googleAccountConfigs: {
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    },
  });

  useEffect(() => {
    if (currentUser.token === null && currentUser.loaded) {

      setAuthState(false);
    }
  }, [currentUser]);

  useEffect(() => {
    dispatch(getSildeImage());
    dispatch(ValidateUser());
  }, [dispatch]);

  return (
    <div className="App dark:text-gray-50">
      <ModalProvider>
        <SearchProvider>
          <Router>
            <AllRoutes />
          </Router>
        </SearchProvider>
      </ModalProvider>
    </div>
  );
}

export default App;
