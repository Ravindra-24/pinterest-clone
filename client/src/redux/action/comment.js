import { toast } from "react-hot-toast";
import * as api from "../api";
import { getPostDetails } from "./post";

export const postComment =
  (id, commentData, setLoading) => async (dispatch) => {
    try {
      const response = await api.postComments(id, commentData);
      // console.log(response.data);
      dispatch(getPostDetails(id));
      toast.success(response.message);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  export const updateComentLike = (commentId, postId) => async (dispatch) => {
    try { await api.commentLike(commentId, postId);
      dispatch(getPostDetails(postId));
    } catch (error) {
      toast.error(error.response.data.error);
      console.log(error);
    }
  };


export const deleteComment =(commentId, postId) => async (dispatch) => {
    try {
      const response = await api.deletePostComment(commentId, postId);
      // console.log(response.data);
      dispatch(getPostDetails(postId));
      toast.success(response.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }
}