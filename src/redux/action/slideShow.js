import * as api from "../api";

export const getSildeImage = () => async (dispatch) => {
    try {
      const response = await api.slideImages();
      dispatch({type:"SLIDE_SHOW_IMAGES", payload:response.data})
    } catch (error) {
      console.log(error);
    }
  }