const initialsSate = {
  slideshowImages: [],
  loaded: false,
};

const ImageSliderReducer = (state = initialsSate, action) => {
  const { payload, type } = action;
  switch (type) {
    case "SLIDE_SHOW_IMAGES":
      if (payload) {
        return {
          ...state,
          slideshowImages: payload,
          loaded: true,
        };
      }
      return state;

    default:
      return state;
  }
};

export default ImageSliderReducer;
