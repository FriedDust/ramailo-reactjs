import {createSelector} from 'reselect'

import * as StoreInterfaces from '../interfaces/store';
import * as DataInterfaces from '../interfaces/data';

function findData(metaType: string) {
    return function (store: StoreInterfaces.StoreStateProps) {
        return store[metaType];
    };
}

export type DataListSelectorProps = (metaType: string) => Array<DataInterfaces.DataResourceProps>;

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
