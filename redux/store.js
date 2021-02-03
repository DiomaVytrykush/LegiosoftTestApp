import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import photoReducer from './reducers/photoReducer';
import rootSaga from './sagas/index';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({photoReducer});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
