import {Dispatch} from 'redux';

import * as httpUtil from '../utils/http';
import * as  ActionBase from './base';

// import {injectAsyncReducer} from '../store';

// import data from '../reducers/data';

export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const REQUEST_DELETE_DATA = 'REQUEST_DELETE_DATA';
export const RECEIVE_DELETE_DATA = 'RECEIVE_DELETE_DATA';

export type REQUEST_DATA = typeof REQUEST_DATA;
export type RECEIVE_DATA = typeof RECEIVE_DATA;
export type REQUEST_DELETE_DATA = typeof REQUEST_DELETE_DATA;
export type RECEIVE_DELETE_DATA = typeof RECEIVE_DELETE_DATA;



type DataItemPayload = {
    id: string
}

//TODO : Note : Code is assuming data payload data will always have id
export type ReceiveDataPayload = Array<DataItemPayload>;

export type RequestDeleteDataPayload = DataItemPayload;
export type ReceiveDeleteDataPayload = DataItemPayload;

export type RequestDataAction = ActionBase.Action<REQUEST_DATA>;
export type ReceiveDataAction = ActionBase.ActionWithPayload<RECEIVE_DATA, ReceiveDataPayload>;

export type RequestDeleteDataAction = ActionBase.ActionWithPayload<REQUEST_DELETE_DATA, RequestDeleteDataPayload>;
export type ReceiveDeleteDataAction = ActionBase.ActionWithPayload<RECEIVE_DELETE_DATA, ReceiveDeleteDataPayload>;


export type ActionsTypes =
    & RequestDataAction
    & ReceiveDataAction
    & RequestDeleteDataAction
    & ReceiveDeleteDataAction;

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
};


export type DeleteDataThunkProps = (metaProps: { type: string, name: string },
                                    dataProps: { id: string },
                                    callback?: () => void) => void;

export const deleteData: DeleteDataThunkProps = ({type, name}, {id}) => {
    return (dispatch: Dispatch<{}>) => {

        let modelPrefix = type.toUpperCase() + "_";

        dispatch({
            type: modelPrefix + REQUEST_DELETE_DATA,
            payload: {id}
        });

        httpUtil.destroy(`http://localhost:8081/api/${name}/${id}`)
            .then(() => {
                dispatch({
                    type: modelPrefix + RECEIVE_DELETE_DATA,
                    payload: {id}
                });
            }, () => {

            });

    }
};