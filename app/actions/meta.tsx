import * as httpUtil from '../utils/http';
import {Dispatch} from 'redux';
import {createActions} from 'redux-actions'

import {injectAsyncReducer} from '../store';
import createDataReducer from '../reducers/data';

import * as ActionBase from './base';
import * as MetaInterfaces from '../interfaces/Meta';

export const REQUEST_META = 'REQUEST_META';
export const RECEIVE_META = 'RECEIVE_META';

export type REQUEST_META = typeof REQUEST_META;
export type RECEIVE_META = typeof RECEIVE_META;

export type ReceiveMetaPayload = Array<MetaInterfaces.MetaResourceProps>;

export type RequestMetaAction = ActionBase.Action<REQUEST_META>;
export type ReceiveMetaAction = ActionBase.ActionWithPayload<RECEIVE_META, ReceiveMetaPayload>;

export type ActionsTypes =
    & RequestMetaAction
    & ReceiveMetaAction;

export const {requestMeta, receiveMeta} = createActions({
    REQUEST_META: () => ({}),
    RECEIVE_META: (payload: ReceiveMetaPayload) => payload
});

export type LoadMetaThunkProps = () => void;

export const loadMeta: LoadMetaThunkProps = () => {
    return (dispatch: Dispatch<{}>) => {

        dispatch(requestMeta());

        httpUtil.get('http://localhost:8081/api/meta')
            .then((response) => {

                response.data.forEach((d : MetaInterfaces.MetaResourceProps ) => {
                    injectAsyncReducer(d.type, createDataReducer(d.type));
                });

                dispatch(receiveMeta(response.data));
            });

    }
};
