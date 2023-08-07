import toast from "react-hot-toast";
import * as api from "../api";

export const signupUser = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signup(authData);
    dispatch({ type: "AUTH", data });
    navigate("/login");
  } catch (error) {
    console.log(error);
  }
};

export const loginUser =
  (authData, navigate, setProgress) => async (dispatch) => {
    try {
      setProgress(30);
      const responseData = await api.login(authData);
      setProgress(70);
      dispatch({ type: "AUTH", payload: responseData.data });
      const { token } = responseData;
      api.API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", responseData.data.token);
      setProgress(100);
      toast.success(responseData.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setProgress(100);
    }
  };

export const ValidateUser = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;
    const responseData = await api.validate(token);
    dispatch({ type: "AUTH", payload: {token,user:responseData.data.user} });
    toast.success(responseData.message);
  } catch (error) {
    toast.error(error.responseData.message);
    console.log(error);
  }
};