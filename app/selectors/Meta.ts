import {createSelector} from 'reselect'

import * as StoreInterfaces from '../interfaces/Store';
import * as MetaInterfaces from '../interfaces/Meta';

export const metaSelector = (state: StoreInterfaces.StoreStateProps) => state.meta;

export const metaTypesSelector = createSelector(
    metaSelector,
    (meta: MetaInterfaces.MetaStoreProps) => meta.types
);

export const metaTypeListSelector = createSelector(
    metaSelector,
    (meta: MetaInterfaces.MetaStoreProps) => Object.keys(meta.types).map((metaType: string) => meta.types[metaType])
);

export type MetaSelectorProps = (param : {name?: string, type?: string}) => MetaInterfaces.MetaResourceProps;

export const findMeta = (store: StoreInterfaces.StoreStateProps) => {
    const metaTypeSelector : MetaSelectorProps = ({name, type}) => {
        return createSelector(
            metaTypesSelector,
            (types: MetaInterfaces.MetaStoreProps['types']) => {
                let keys: Array<string> = Object.keys(types);
                for (let i = 0; i < keys.length; i++) {
                    let key = keys[i];
                    if (types[key].name === name || types[key].type === type) {
                        return types[key];
                    }
                }
                return null;
            }
        )(store);
    };
    return metaTypeSelector;
};

