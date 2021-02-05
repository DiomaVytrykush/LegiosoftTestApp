import axios from 'axios';
import {call, put, takeEvery} from 'redux-saga/effects';

function* fetchPhotos() {
  try {
    const url = 'https://60197878fa0b1f0017acd264.mockapi.io/api/v1/photo';
    const result = yield call(axios.get, url);
    yield put({type: 'GET_PHOTOS_SUCCESS', result});
  } catch (error) {
    yield put({type: 'GET_PHOTOS_FAILED', error});
  }
}

export function* getPhotosSaga() {
  yield takeEvery('GET_PHOTOS_REQUESTED', fetchPhotos);
}

function* addPhotoFucn(action) {
  try {
    const url = 'https://60197878fa0b1f0017acd264.mockapi.io/api/v1/photos';
    const result = yield call(axios.post, url, action.payload);
    yield put({type: 'ADD_PHOTOS_SUCCESS', result});
  } catch (error) {
    yield put({type: 'ADD_PHOTOS_FAILED', error});
  }
}

export function* addPhotoSaga() {
  yield takeEvery('ADD_PHOTOS_REQUESTED', addPhotoFucn);
}
