import {applyMiddleware, createStore, Store} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
const middleware = applyMiddleware(thunk, promise(), logger);

import createReducer from './reducers/index';

interface AsyncStore extends Store<{}>{
    asyncReducers?: any
}

const store : AsyncStore = createStore(createReducer({}), middleware);

store.asyncReducers = {};

export function injectAsyncReducer(name: string, asyncReducer: any) {
    store.asyncReducers[name]  = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
}

export default store;
