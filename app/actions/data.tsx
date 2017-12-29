import {Dispatch} from 'redux';

import * as httpUtil from '../utils/http';
import * as  ActionBase from './base';

// import {injectAsyncReducer} from '../store';

// import data from '../reducers/data';

export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';

export type REQUEST_DATA = typeof REQUEST_DATA;
export type RECEIVE_DATA = typeof RECEIVE_DATA;

//TODO : Note : Code is assuming data payload data will always have id
export type ReceiveDataPayload = Array<{id: string}>;

export type RequestDataAction = ActionBase.Action<REQUEST_DATA>;
export type ReceiveDataAction = ActionBase.ActionWithPayload<RECEIVE_DATA, ReceiveDataPayload>;

export type ActionsTypes =
    & RequestDataAction
    & ReceiveDataAction;

export type LoadDataThunkProps = (metaProps: { type: string, name: string },
                                  callback?: () => void) => void

export const loadData: LoadDataThunkProps = ({type, name}) => {
    return (dispatch: Dispatch<{}>) => {

        let modelPrefix = type.toUpperCase() + "_";

        dispatch({
            type: modelPrefix + REQUEST_DATA,
            payload: {pageNumber: 1}
        });

        httpUtil.get(`http://localhost:8081/api/${name}`)
            .then((response) => {
                dispatch({
                    type: modelPrefix + RECEIVE_DATA,
                    payload: response.data.data
                });
                // dispatch({
                //     type: type + "_PAGINATION_SUCCESS",
                //     payload: {type, pageNumber: 1, data: response.data.data.map((d: { id: number }) => d.id)}
                // });
            });

    }
}
