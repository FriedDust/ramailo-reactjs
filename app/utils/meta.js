import store from '../store';

export function toString({modelMeta, colData}) {
    let state = store.getState();
    let modeMetaKeys = Object.keys(state.meta.types);

    if (modeMetaKeys.indexOf(modelMeta.type) > -1) {

        let toStringAttr = state.meta.types[modelMeta.type].stringify;

        return colData[toStringAttr];
    }

    return colData;
}


