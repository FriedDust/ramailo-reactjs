import * as httpUtil from '../utils/http';

export function loadData({modelType, modelName}, callback) {
    return (dispatch) => {
        httpUtil.get(`http://localhost:8081/api/${modelName}`)
            .then((response) => {
                dispatch({
                    type: "LOAD_DATA",
                    payload: {modelType, data: response.data}
                });
                if (callback) callback(response);
            });
    }
}


export function addData({modelType, modelName, modelDataItem}, callback) {
    return (dispatch) => {
        dispatch({type: "DISABLE_ADD_DATA", payload: {modelType}});
        httpUtil.post(`http://localhost:8081/api/${modelName}`, modelDataItem)
            .then((response) => {
                dispatch({
                    type: "UPDATE_DATA_ITEM",
                    payload: {modelType, data: response.data}
                });
                dispatch({type: "ENABLE_ADD_DATA", payload: {modelType}});
                if (callback) callback(response);
            });
    }
}

export function editData({modelType, modelName, modelDataItem}, callback) {
    return (dispatch) => {
        dispatch({type: "DISABLE_ADD_DATA", payload: {modelType}});
        httpUtil.put(`http://localhost:8081/api/${modelName}/${modelDataItem.id}`, modelDataItem)
            .then((response) => {
                dispatch({
                    type: "UPDATE_DATA_ITEM",
                    payload: {modelType, data: response.data}
                });
                dispatch({type: "ENABLE_ADD_DATA", payload: {modelType}});

                if (callback) callback(response);
            });
    }
}

export function loadDataItem({modelType, modelName, modelDataId}, callback) {
    return (dispatch) => {
        httpUtil.get(`http://localhost:8081/api/${modelName}/${modelDataId}`)
            .then((response) => {
                dispatch({
                    type: "UPDATE_DATA_ITEM",
                    payload: {modelType, data: response.data}
                });

                if (callback) callback(response);
            });
    }
}

