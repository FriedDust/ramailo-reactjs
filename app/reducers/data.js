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
                    dataIds: [],
                    getAll(filter) {
                        return this.dataIds.map((id)=> this.byId[id]);
                    }
                };
            }
            return _state;
        }

        case "LOAD_DATA": {
            let dataIds = [];
            let byId = {};
            payloadData.forEach((d) => {
                byId[d.id] = d;
                dataIds.push(d.id);
            });
            return {
                ...state, ...{
                    [payload.modelType]: {
                        byId,
                        dataIds,
                        getAll(filter) {
                            return this.dataIds.map((id)=> this.byId[id]);
                        }
                    }
                }
            };
        }

        case "LOAD_DATA_ITEM":
        case "ADD_DATA": {
            let newStateData = {...state[payload.modelType]};
            console.log(payload, 111)
            newStateData['byId'][payloadData.id] = payloadData;
            if(newStateData['dataIds'].indexOf(payloadData.id) === -1) {
                newStateData['dataIds'].push(payloadData.id);
            }
            return {...state, ...{[payload.modelType]: newStateData}};
        }


    }

    return state;
}
