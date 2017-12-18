import {connect} from 'react-redux';
import store from '../store';

export function toString(meta, value) {

    if (typeof value === 'object') {
        let state = store.getState();
        let toStringAttr = state.meta.types[meta.type].stringify;

        return value[toStringAttr];
    }

    return value;
}


