import * as type from '../actions/types';

const initialState = {
  photoList: [],
  loading: false,
  error: null,
};

const photoReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.GET_PHOTOS_REQUESTED:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case type.GET_PHOTOS_SUCCESS:
      return {
        ...state,
        loading: false,
        photoList: action.result.data,
      };
    case type.GET_PHOTOS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case type.ADD_PHOTOS_REQUESTED:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case type.ADD_PHOTOS_SUCCESS:
      return {
        ...state,
        loading: false,
        photoList: [action.result.data, ...state.photoList],
      };
    case type.ADD_PHOTOS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default photoReducer;
