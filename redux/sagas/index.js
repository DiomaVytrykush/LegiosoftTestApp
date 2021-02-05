import {all} from 'redux-saga/effects';
import {getPhotosSaga, postPhotoSaga} from './photoSaga';

export default function* rootSaga() {
  yield all([getPhotosSaga(), postPhotoSaga()]);
}
