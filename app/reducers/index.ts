import {combineReducers} from 'redux';
import meta from './Meta';

export default function createReducer(asyncReducers: {}) {
    return combineReducers({
        meta,
        ...asyncReducers
    });
}