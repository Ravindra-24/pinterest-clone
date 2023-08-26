import { toast } from "react-hot-toast";
import * as api from "../api/index.js";

export const getUser = (id) => async (dispatch) => {
  try {
    const response = await api.findUser(id);
    console.log(response);
    dispatch({ type: "GET_USER", payload: response.data });
  } catch (error) {
    toast.error(error.response.data.message);
  } finally{
    // setLoading(false);
  }
};

export const userPosts = (id) => async (dispatch) => {
  try {
    const response = await api.getUserPosts(id);
    dispatch({ type: "GET_USER_POSTS", payload: response.data });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const followUser = (userId, setIsLoading) => async (dispatch) => {
  try {
    await api.follow(userId);
    dispatch(getUser(userId));
    dispatch(userPosts(userId));
  } catch (error) {
    toast.error(error.response.data.message);
  } finally{
    setIsLoading(false);
  }
};
