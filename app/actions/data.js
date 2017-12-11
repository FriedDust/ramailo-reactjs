import * as httpUtil from '../utils/http';

export function loadData({modelType, modelName}) {
    return (dispatch) => {
        httpUtil.get(`http://localhost:8081/api/${modelName}`)
            .then((response) => {
                dispatch({
                    type: "LOAD_DATA",
                    payload: {modelType, data: response.data}
                });
            });
    }
}


export function addData({modelType, modelName, modelDataItem}) {
    return (dispatch) => {
        dispatch({type: "DISABLE_ADD_DATA", payload: {modelType}});
        httpUtil.post(`http://localhost:8081/api/${modelName}`, modelDataItem)
            .then((response) => {
                dispatch({
                    type: "ADD_DATA",
                    payload: {modelType, data: response.data}
                });
                dispatch({type: "ENABLE_ADD_DATA", payload: {modelType}});
            });
    }
}

export function loadDataItem({modelType, modelName, modelDataId}) {
    return (dispatch) => {
        httpUtil.get(`http://localhost:8081/api/${modelName}/${modelDataId}`)
            .then((response) => {
                dispatch({
                    type: "LOAD_DATA_ITEM",
                    payload: {modelType, data: response.data}
                });
            });
    }
}

