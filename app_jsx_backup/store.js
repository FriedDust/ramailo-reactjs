import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
const middleware = applyMiddleware(thunk, promise(), logger);

import createReducer from './reducers';

const store = createStore(createReducer(), middleware);
store.asyncReducers = {};

export function injectAsyncReducer(name, asyncReducer) {
    store.asyncReducers[name] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
}

export default store;
