import axios from "axios";
import store from '../../redux/store'

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 5000,
  headers: {},
});

API.interceptors.response.use((response) => {
  return response.data;
},(error) => {
    console.log(error);
    if(error.response.status===401){
      store.dispatch({type:"LOGOUT"})
    }
    return Promise.reject(error);
});


export const validate =(token)=>API.get(`/auth/validate/${token}`)

export const signup =(authData)=>API.post("/auth/signup",authData)
export const login =(authData)=>API.post("/auth/login",authData)