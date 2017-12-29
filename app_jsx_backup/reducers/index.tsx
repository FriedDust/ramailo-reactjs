import {combineReducers} from 'redux';
import meta from './meta';

export default function createReducer(asyncReducers) {
    return combineReducers({
        meta,
        ...asyncReducers
    });
}