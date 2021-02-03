import {all} from 'redux-saga/effects';
import {getPhotosSaga, addPhotoSaga} from './photoSaga';

export default function* rootSaga() {
  yield all([getPhotosSaga(), addPhotoSaga()]);
}
