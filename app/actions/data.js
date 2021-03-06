import * as httpUtil from '../utils/http';

export function loadData({modelType, modelName}, callback) {
    return (dispatch) => {
        dispatch({
            type: modelType + "_REQUEST_PAGE",
            payload: {modelType, pageNumber: 1}
        });
        httpUtil.get(`http://localhost:8081/api/${modelName}`)
            .then((response) => {
                dispatch({
                    type: modelType + "_LOAD_DATA",
                    payload: {modelType, data: response.data.data}
                });
                dispatch({
                    type: modelType + "_RECEIVE_PAGE",
                    payload: {modelType, pageNumber: 1, data: response.data.data.map((d) => d.id)}
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
                    type: modelType + "_UPDATE_DATA_ITEM",
                    payload: {modelType, data: response.data}
                });
                dispatch({type: modelType + "_ENABLE_ADD_DATA", payload: {modelType}});
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
                    type: modelType + "_UPDATE_DATA_ITEM",
                    payload: {modelType, data: response.data}
                });
                dispatch({type: modelType + "_ENABLE_ADD_DATA", payload: {modelType}});

                if (callback) callback(response);
            });
    }
}

export function deleteData({modelType, modelName, modelDataItem}, callback) {
    return (dispatch) => {
        dispatch({type: modelType + "_DISABLE_ADD_DATA", payload: {modelType}});
        httpUtil.destroy(`http://localhost:8081/api/${modelName}/${modelDataItem.id}`)
            .then((response) => {
                dispatch({
                    type: "DELETE_DATA_ITEM",
                    payload: {modelType, data: modelDataItem}
                });
                dispatch({type: modelType + "_ENABLE_ADD_DATA", payload: {modelType}});
                if (callback) callback(response);
            })
            .catch((err)=> {
                alert("Something went wrong");
            });
    }
}

export function loadDataItem({modelType, modelName, modelDataId}, callback) {
    return (dispatch) => {
        httpUtil.get(`http://localhost:8081/api/${modelName}/${modelDataId}`)
            .then((response) => {
                dispatch({
                    type: modelType + "_UPDATE_DATA_ITEM",
                    payload: {modelType, data: response.data}
                });

                if (callback) callback(response);
            });
    }
}

