import toast from "react-hot-toast";
import * as api from "../api";

export const createPost =
  (formData, navigate, setProgress, scrollToTop) => async (dispatch) => {
    try {
      setProgress(40);
      const response = await api.create(formData);
      setProgress(60);
      setProgress(60);
      toast.success(response.message);
      setProgress(100);
      navigate("/");
      scrollToTop()
    } catch (error) {
      toast.error(error.response.data.error);
      setProgress(100);
    }
  };

  export const searchPosts = (search, setLoading) => async (dispatch) => {
    try {
      const response = await api.search(search);
      dispatch({ type: "FETCH_SEARCH_POSTS", payload: response.data });
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  
  }

export const updatePost =
  (id, formData, navigate, setProgress, setIsLoading) => async (dispatch) => {
    try {
      setProgress(40);
      const response = await api.update(id, formData);
      setProgress(60);
      dispatch({ type: "UPDATE_POST", payload: response.data });
      setProgress(80);
      toast.success(response.message);
      setProgress(100);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.error);
      setProgress(100);
    } finally {
      // setProgress(100);
      setIsLoading(false);
    }
  };

export const deletePost = (id, setProgress) => async (dispatch) => {
  try {
    setProgress(40);
    const response = await api.deletePostId(id);
    dispatch({ type: "DELETE_POST", payload: id });
    toast.success(response.message);
    setProgress(100);
  } catch (error) {
    toast.error(error.response.data.error);
    setProgress(100);
  }
};

export const getPostDetails = (id, navigate, setLoading) => async (dispatch) => {
  try {
    const response = await api.getPost(id);
    dispatch({ type: "GET_POST_DETAILS", payload: response?.data });
  } catch (error) {
    toast.error(error.response?.data?.message);
    navigate("/");
  } finally{
    setLoading(false);
  }
};

export const updatePostLike = (postId,navigate, setLoading, setIsLoading) => async (dispatch) => {
  try {
    await api.postLike(postId);
    dispatch(getPostDetails(postId,navigate, setLoading));
  } catch (error) {
    toast.error(error.response.data.error);
  }finally{
    setIsLoading(false);
  }
};

export const fetchPosts =
  (page, limit, setProgress, setDone, setLoading) =>
  async (dispatch) => {
    try {
      setProgress(50);
      const response = await api.fetchAllPosts(page, limit);
      setProgress(80);
      if (response.data.length === 0) {
        setDone(true);
      } else {
        // setPosts((prevPosts) => {
        //   const uniquePosts = response.data.filter(
        //     (newPost) =>
        //       !prevPosts.some(
        //         (existingPost) => existingPost._id === newPost._id
        //       )
        //   );
        //   return [...prevPosts, ...uniquePosts];
        // });

        dispatch({ type: "FETCH_ALL_POSTS", payload: response.data });
      }
      setProgress(100);
    } catch (error) {
      if (error.response.data.error) {
        setProgress(100);
        toast.error(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  
