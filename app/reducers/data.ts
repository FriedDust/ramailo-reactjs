import * as DataInterfaces from '../interfaces/data';
import * as DataActions from '../actions/data';

export default function createDataReducer(metaType: string) {
    return function meta(state: DataInterfaces.DataStoreProps = {
        loaded: false,
        byId: {}
    }, action: DataActions.ActionsTypes) {

        let payload = action.payload;
        let modelPrefix = metaType.toUpperCase() + "_";

        switch (action.type) {

            case modelPrefix + DataActions.REQUEST_DATA: {
                return {
                    loaded: false,
                    ...state,
                };
            }

            case modelPrefix + DataActions.RECEIVE_DATA: {
                payload.forEach((d) => {
                    state['byId'][d.id] = d;
                });
                return {
                    loaded: true,
                    ...state
                };
            }

        }

        return state;
    }
}