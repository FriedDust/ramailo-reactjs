import * as httpUtil from '../utils/http';

export function loadMeta() {
    return (dispatch) => {
        httpUtil.get('http://localhost:8081/api/meta')
            .then((response) => {
                dispatch({
                    type: "LOAD_META",
                    payload: response.data
                });
                dispatch({
                    type: "INIT_DATA_TREE",
                    payload: response.data
                });
            });
    }
}
