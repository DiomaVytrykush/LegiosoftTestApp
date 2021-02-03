import * as type from './types';

export const getPhoto = (photo) => ({
  type: type.GET_PHOTOS_REQUESTED,
  payload: photo,
});
