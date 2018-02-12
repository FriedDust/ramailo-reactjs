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
                    state['byId'][d.id] = {
                        ...d,
                        loaded: true
                    };
                });
                return {
                    loaded: true,
                    ...state
                };
            }

            case modelPrefix + DataActions.REQUEST_DELETE_DATA: {
                state['byId'][payload.id]['loaded'] = false;
                return {
                    ...state
                };
            }

            case modelPrefix + DataActions.RECEIVE_DELETE_DATA: {
                delete state['byId'][payload.id];
                return {
                    ...state
                };
            }

        }

        return state;
    }
}