import * as httpUtil from '../utils/http';

// import {injectAsyncReducer} from '../store';
import data from '../reducers/data';


function loadMetaAction(payload) {
    return {
        type:  "LOAD_META",
        payload: payload
    };
}

export function loadMeta(callback) {


    return (dispatch) => {
        httpUtil.get('http://localhost:8081/api/meta')
            .then((response) => {
                // response.data.forEach((d) => {
                //     injectAsyncReducer(d.type, data(d.type));
                // });
                dispatch({
                    type: "LOAD_META",
                    payload: response.data
                });
                if (callback) callback(response);
            });
    }
}
