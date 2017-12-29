import * as MetaInterfaces from '../interfaces/meta'
import * as MetaActions from '../actions/meta';

export default function meta(state: MetaInterfaces.MetaStoreProps = {
    loaded: false,
    types: {
    }
}, action: MetaActions.ActionsTypes) {

    let payload = action.payload;

    switch (action.type) {

        case MetaActions.REQUEST_META: {

            return {
                ...state,
                loaded: false
            };
        }

        case MetaActions.RECEIVE_META: {
            let types = state.types;

            payload.forEach((payloadItem)=> {
                types[payloadItem.type] = payloadItem;
            });

            return {
                ...state,
                types,
                loaded: true
            };
        }

    }

    return state;
}
