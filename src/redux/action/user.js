import { toast } from "react-hot-toast";
import * as api from "../api/index.js";
import { ValidateUser } from "./auth.js";

export const getUser = (id, setLoading) => async (dispatch) => {
  try {
    const response = await api.findUser(id);
    dispatch({ type: "GET_USER", payload: response.data });
  } catch (error) {
    toast.error(error.response.data.message);
    console.log(error);
  } finally {
    setLoading(false);
  }
};

export const userPosts = (id, setLoading) => async (dispatch) => {
  try {
    const response = await api.getUserPosts(id);
    dispatch({ type: "GET_USER_POSTS", payload: response.data });
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    setLoading(false);
  }
};

export const followUser =
  (userId, setLoading, setIsLoding) => async (dispatch) => {
    try {
      await api.follow(userId);
      dispatch(getUser(userId, setLoading));
      dispatch(userPosts(userId, setLoading));
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
      setIsLoding(false);
    }
  };

export const updateUser =
  (formData, id, navigate, setProgress, setLoading) => async (dispatch) => {
    try {
      setProgress(40);
      const response = await api.updateUserData(formData);
      setProgress(70);
      dispatch(ValidateUser());
      toast.success(response.message);
      setProgress(100);
      navigate(`/user/${id}`);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
