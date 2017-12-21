export default function data(state = {}, action) {

    let payload = action.payload;

    if(!payload) {
        return state;
    }

    let payloadData = payload.data;

    switch (action.type) {

        case "INIT_DATA_TREE": {
            let payload = action.payload;
            let _state = {};

            for (let k in payload) {
                let payloadItem = payload[k];
                _state[payloadItem.type] = {
                    byId: {},
                    getAll(filter) {
                        let dataIds = Object.keys(this.byId);
                        return dataIds.map((id)=> this.byId[id]);
                    }
                };
            }
            return _state;
        }

        case "LOAD_DATA": {
            let byId = {};
            payloadData.forEach((d) => {
                byId[d.id] = d;
            });
            return {
                ...state, ...{
                    [payload.modelType]: {
                        byId,
                        getAll(filter) {
                            let dataIds = Object.keys(this.byId);
                            return dataIds.map((id)=> this.byId[id]);
                        }
                    }
                }
            };
        }

        case "UPDATE_DATA_ITEM": {
            let newStateData = {...state[payload.modelType]};
            newStateData['byId'][payloadData.id] = payloadData;
            return {...state, ...{[payload.modelType]: newStateData}};
        }

        case "DELETE_DATA_ITEM": {
            let newStateData = {...state[payload.modelType]};
            delete newStateData['byId'][payloadData.id];
            return {...state, ...{[payload.modelType]: newStateData}};
        }


    }

    return state;
}
