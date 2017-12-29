import {createSelector} from 'reselect'

import * as StoreInterfaces from '../interfaces/Store';
import * as DataInterfaces from '../interfaces/Data';

function findData(metaType: string) {
    return function (store: StoreInterfaces.StoreStateProps) {
        return store[metaType];
    };
}

export type DataListSelectorProps = (metaType: string) => void;

export const findDataList = function (store: StoreInterfaces.StoreStateProps) {
    const dataListSelector: DataListSelectorProps = function (metaType) {

        return createSelector(
            findData(metaType),
            (data: DataInterfaces.DataStoreProps) => {
                //TODO: Implement pagination
                return Object.keys(data.byId).map((id: string) => data.byId[id]);
            }
        )(store);
    };
    return dataListSelector;
};
