import * as type from './types';

export const getPhoto = (photo) => ({
  type: type.GET_PHOTOS_REQUESTED,
  payload: photo,
});

export const addPhoto = (avatar, createdAt) => ({
  type: type.ADD_PHOTOS_REQUESTED,
  payload: {avatar, createdAt},
});
