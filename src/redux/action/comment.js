import { toast } from "react-hot-toast";
import * as api from "../api";
import { getPostDetails } from "./post";

export const postComment =
  (id, commentData,navigate, setLoading, setIsLoading) => async (dispatch) => {
    try {
      const response = await api.postComments(id, commentData);
      dispatch(getPostDetails(id, navigate, setLoading));
      toast.success(response.message);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

export const updateComentLike = (commentId, postId, navigate, setLoading) => async (dispatch) => {
  try {
    await api.commentLike(commentId, postId);
    dispatch(getPostDetails(postId, navigate, setLoading));
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const deleteComment = (commentId, postId, navigate, setLoading) => async (dispatch) => {
  try {
    const response = await api.deletePostComment(commentId, postId);
    dispatch(getPostDetails(postId, navigate, setLoading));
    toast.success(response.message);
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
