import store from '../store';

export function toString({modelMeta, row, modelMetas}) {

    let modeMetaKeys = Object.keys(modelMetas);
    let colData = row[modelMeta.name];

    if (modeMetaKeys.indexOf(modelMeta.type) > -1) {
        if(colData === null) return null;

        let toStringAttr = modelMetas[modelMeta.type].stringify;
        return colData[toStringAttr];
    }

    return colData;
}

export function getMetaFromType(type) {
    let state = store.getState();
    return state.meta.types[type];
}