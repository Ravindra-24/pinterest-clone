import axios from "axios";
import store from '../../redux/store'
import toast from "react-hot-toast";

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  // timeout: 5000,
  headers: {},
});

API.interceptors.request.use((req) => {
  const auth = store.getState().authReducer;
  if (auth.token) {
    req.headers.authorization = `Bearer ${auth.token}`;
  }
  return req;
},(error) => {
    console.log(error);
    toast.error(error.response.message);
    return Promise.reject(error)
})

API.interceptors.response.use((response) => {
  if(response) return response.data;
},(error) => { 
  if(error.axiosError){
    toast.error(error.message);
  }
    // console.log(error);
    if(error.response.status===401){
      store.dispatch({type:"LOGOUT"})
    }
    return  Promise.reject(error)
});


export const validate =(token)=>API.get(`/auth/validate/${token}`)

export const signup =(authData)=>API.post("/auth/signup",authData)
export const login =(authData)=>API.post("/auth/login",authData)

export const forgot = (email)=>API.post("/auth/forgot-password",email)
export const reset = (token, password)=>API.post(`/auth/reset-password/${token}`,password)

export const create = (formData) => API.post("/post", formData);
export const update = (id, formData) => API.patch(`/post/update/${id}`, formData);
export const deletePostId = (id) => API.post(`post/${id}`); 
export const postLike = (postId) => API.patch(`/post/like/${postId}`);

export const fetchAllPosts = (page, limit, search) => API.get(`/post?_page=${page}&_limit=${limit}&_search=${search}`);
export const getPost = (id) => API.get(`/post/${id}`);

export const postComments = (id, commentData) => API.post(`/comment/${id}`, commentData);
export const commentLike = (commentId, postId) => API.patch(`/comment/like/${commentId}/${postId}`);
export const deletePostComment = (commentId, postId) => API.delete(`/comment/${commentId}/${postId}`);

export const findUser = (id) => API.get(`/user/${id}`);
export const getUserPosts = (id) => API.get(`/user/user-posts/${id}`);
export const follow = (userId) => API.patch(`/user/follow/${userId}`);