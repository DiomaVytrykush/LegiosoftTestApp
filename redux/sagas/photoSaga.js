import {call, put, takeEvery} from 'redux-saga/effects';

const apiUrl = 'https://60197878fa0b1f0017acd264.mockapi.io/api/v1/photos';

function getApi() {
  return fetch(apiUrl, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

function* fetchPhotos() {
  try {
    const photos = yield call(getApi);
    yield put({type: 'GET_PHOTOS_SUCCESS', photos});
  } catch (error) {
    yield put({type: 'GET_PHOTOS_FAILED', error});
  }
}

export function* getPhotosSaga() {
  yield takeEvery('GET_PHOTOS_REQUESTED', fetchPhotos);
}

function* addPhoto() {
  try {
    // yield put({type: 'GET_PHOTOS_SUCCESS', photos});
  } catch (error) {
    // yield put({type: 'GET_PHOTOS_FAILED', error});
  }
}

export function* addPhotoSaga() {
  yield takeEvery('ADD_PHOTO_REQUESTED', addPhoto);
}
