


export default function meta(state = {
    types: {},
    nameTypeMap: {},
    modelMetaLoaded: false,
    getAll(filter) {
        let keys = Object.keys(this.types);
        return keys.map((k)=> this.types[k]);
    },
    getModelMeta() {
        return (modelType) => {
            return this.types[modelType];
        }
    }
}, action) {

    let payload = action.payload;

    switch (action.type) {

        case "LOAD_META": {
            let payload = action.payload;
            let types = {};
            let nameTypeMap = {};

            for (let k in payload) {
                let payloadItem = payload[k];
                payloadItem.attributes = payloadItem.attributes.map((attr) => {
                    let _attr = {};
                    _attr.name = attr.name;
                    _attr.label = attr.label;
                    _attr.type = attr.type;
                    _attr.isGeneratedValue = attr.autoPk;
                    _attr.isPrimaryKey = attr.autoPk;
                    _attr.childrenType = attr.childrenType;
                    return _attr;
                });
                types[payloadItem.type] = payloadItem;
                nameTypeMap[payloadItem.name] = payloadItem.type;
            }
            return {
                ...state,
                types,
                nameTypeMap,
                modelMetaLoaded: true
            };
        }

        case "DISABLE_ADD_DATA": {
            let modelType = payload.modelType;
            return {
                ...state, ...{
                    [modelType]: {
                        ...state[modelType],
                        ...{
                            disableAddData: true
                        }
                    }
                }
            };
        }

        case "ENABLE_ADD_DATA": {
            let modelType = payload.modelType;
            return {
                ...state, ...{
                    [modelType]: {
                        ...state[modelType],
                        ...{
                            disableAddData: false
                        }
                    }
                }
            };
        }

    }

    return state;
}
