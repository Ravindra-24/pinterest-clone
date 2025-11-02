import axios from "axios";
import store from '../../redux/store'
import toast from "react-hot-toast";

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  // timeout: 5000, https://sore-red-scrubs.cyclic.app,  process.env.REACT_APP_API_BASE_URL
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

export const googleOneTap = (CredentialResponse) => API.post('/auth/google-one-tap', {CredentialResponse}, {withCredentials: true});
export const googleAuth = (codeResponse) => API.post('/auth/google-oauth', {codeResponse}, {withCredentials: true});
export const signup =(authData)=>API.post("/auth/signup",authData)
export const login =(authData)=>API.post("/auth/login",authData)

export const forgot = (email)=>API.post("/auth/forgot-password",email)
export const reset = (token, password)=>API.post(`/auth/reset-password/${token}`,password)

export const create = (formData) => API.post("/posts", formData);
export const update = (id, formData) => API.patch(`/posts/update/${id}`, formData);
export const deletePostId = (id) => API.post(`posts/${id}`); 
export const postLike = (postId) => API.patch(`/posts/like/${postId}`);

export const fetchAllPosts = (page, limit) => API.get(`/posts?_page=${page}&_limit=${limit}`);
export const search = (search) => API.get(`/posts/search?_search=${search}`);
export const getPost = (id) => API.get(`/posts/${id}`);
export const slideImages = () => API.get('/posts/slide-show-images')

export const postComments = (id, commentData) => API.post(`/comments/${id}`, commentData);
export const commentLike = (commentId, postId) => API.patch(`/comments/like/${commentId}/${postId}`);
export const deletePostComment = (commentId, postId) => API.delete(`/comments/${commentId}/${postId}`);

export const findUser = (id) => API.get(`/users/${id}`);
export const getUserPosts = (id) => API.get(`/users/user-posts/${id}`);
export const follow = (userId) => API.patch(`/users/follow/${userId}`);
export const updateUserData = (formData) => API.patch(`/users/update`, formData);