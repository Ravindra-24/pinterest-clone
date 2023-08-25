import { toast } from 'react-hot-toast';
import * as api from '../api/index.js';

export const getUser = (id) => async (dispatch) => {
    try {
        const response = await api.findUser(id);
        console.log(response);
        dispatch({ type: "GET_USER", payload: response.data });
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }
}

export const userPosts = (id) => async (dispatch) => {
    try {
        const response = await api.getUserPosts(id);
        console.log(response);
        dispatch({ type: "GET_USER_POSTS", payload: response.data });
        
    } catch (error) {
        toast.error(error.response.data.message);
    }
}

export const followUser = (userId) => async (dispatch) => {
    try {
        const response = await api.follow(userId);
        // toast.success(response.message);
    } catch (error) {
        toast.error(error.response.data.message);
    }
}