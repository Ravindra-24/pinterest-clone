import toast from "react-hot-toast";
import * as api from "../api";

const errorBox = (error) => {
  if (!error) return;
  error.forEach((err) => {
    return toast.error(err.msg);
  });
};

export const signupUser =
  (authData, navigate, setProgress,setLoading) => async (dispatch) => {
    try {
      setProgress(30);
      const response = await api.signup(authData);
      setProgress(70);
      navigate("/login");
      toast.success(response.message);
      setProgress(100);
    } catch (error) {
      errorBox(error.response.data.data);
      toast.error(error.response.data.message);
      setProgress(100);
    } finally {
      setProgress(100);
      setLoading(false)
    }
  };

export const loginUser =
  (authData, navigate, setLoading, setProgress) => async (dispatch) => {
    try {
      setProgress(30);
      const responseData = await api.login(authData);
      setProgress(70);
      dispatch({ type: "AUTH", payload: responseData.data });
      // const { token } = responseData;
      // api.API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", responseData.data.token);
      setProgress(100);
      toast.success(responseData.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
      setProgress(100);
    } finally {
      setProgress(100);
      setLoading(false);
    }
  };

export const forgotPassword =
  (email, navigate, setLoading, setProgress) => async (dispatch) => {
    try {
      setProgress(30);
      const response = await api.forgot(email);
      setProgress(70);
      toast.success(response.message);
      navigate("/login");
      setProgress(100);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setProgress(100);
      setLoading(false);
    }
  };

export const resetPassword =
  (token, password, navigate, setLoading, setProgress) => async (dispatch) => {
    try {
      setProgress(30);
      const response = await api.reset(token, password);
      setProgress(70);
      toast.success(response.message);
      navigate("/login");
      setProgress(100);
    } catch (error) {
      if (error.response.data.data || error.response.data.message) {
        errorBox(error.response.data.data);
        toast.error(error.response.data.message);
      }
    } finally {
      setProgress(100);
      setLoading(false);
    }
  };

export const ValidateUser = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token)  {
      return dispatch({type:"AUTH",payload:null})
    };
    const responseData = await api.validate(token);
    if (responseData === null) return;
    console.log(responseData)
    dispatch({
      type: "AUTH",
      payload: {
        token,
        user: responseData.data.user,
      
      },
    });
    toast.success(responseData.message);
  } catch (error) {
    if (error.responseData.data.message) {
      toast.error(error.responseData.data.message);
    }
  }
};
