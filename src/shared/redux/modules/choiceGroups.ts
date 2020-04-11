import { call, put, takeEvery } from "redux-saga/effects";

import fetchr from '../util/fetchr';
import { Action, createAction, handleActions } from 'redux-actions';
import { ChoiceGroup } from '../../../../firebase/functions/src/functions/ChoiceGroupsAPI';
import { startHeaderLoading, endHeaderLoading } from './headerLoading';
import { AxiosResponse } from "axios";
import Const from '../../modules/const';
import { startDialogLoading, endDialogLoading } from "./dialogLoading";
import { closeAddDialog } from "./addDialogState";
import { openSnackBar } from "./snackBarState";
import { closeAddChoiceDialog } from "./addChoiceDialogState";
import { closeUpdateChoiceDialog } from "./updateChoiceDialogState";
import { closeRemoveChoiceDialog } from "./removeChoiceDialogState";

export type ChoiceGroups = ChoiceGroup[];

export const SET_CHOICEGROUPS = "SET_CHOICEGROUPS" as const;
export const REMOVE_CHOICEGROUP = "REMOVE_CHOICEGROUP" as const;
export const ADD_CHOICEGROUP = "SET_CHOICEGROUP" as const;
export const UPDATE_CHOICEGROUP = "UPDATE_CHOICEGROUP " as const;

// sagaAction
export const FETCH_CHOICEGROUPS = "FETCH_CHOICEGROUPS" as const; 
export const POST_CHOICEGROUP = "POST_CHOICEGROUP" as const;
export const PATCH_CHOICEGROUP = "PATCH_CHOICEGROUP " as const;
export const DELETE_CHOICEGROUP = "DELETE_CHOICEGROUP" as const;

export const setChoiceGroups = createAction<ChoiceGroups>(SET_CHOICEGROUPS);
export const addChoiceGroup = createAction<ChoiceGroup>(ADD_CHOICEGROUP);
export const updateChoiceGroup = createAction<ChoiceGroup>(UPDATE_CHOICEGROUP);
export const removeChoiceGroup = createAction<string>(REMOVE_CHOICEGROUP);

// sagaAction
export const fetchChoiceGroups = createAction(FETCH_CHOICEGROUPS); 
export const postChoiceGroup = createAction<ChoiceGroup>(POST_CHOICEGROUP); 
export const patchChoiceGroup = createAction<ChoiceGroup>(PATCH_CHOICEGROUP); 
export const deleteChoiceGroup = createAction<string>(DELETE_CHOICEGROUP);

export const INITIAL_STATE: ChoiceGroups = []; 

/**
 * チョイスグループのreadをサーバーにリクエストし、結果をStateに格納する
 * */
function* requestFetchChoiceGroup() {
  yield put(startHeaderLoading()); 
  const result: AxiosResponse<ChoiceGroups> = yield call([fetchr, fetchr.read], Const.CHOICEGROUPS_SERVICE, {}, {});
  yield put(setChoiceGroups(result.data))
  yield put(endHeaderLoading()); 
}

/**
 * チョイスグループの作成をリクエストし、作成されたグループをStateに格納する
 * */
function* requestPostChoiceGroup({ payload }: Action<ChoiceGroup>) {
  yield put(startDialogLoading());
  const result: AxiosResponse<ChoiceGroup> = yield call([fetchr, fetchr.create], Const.CHOICEGROUPS_SERVICE, {}, payload, {});
  yield put(addChoiceGroup(result.data));
  yield put(endDialogLoading());
  yield put(closeAddChoiceDialog());
  yield put(openSnackBar("グループを追加しました"));
}

/**
 * チョイスグループの編集をリクエストし、編集されたグループをStateに格納する
 * */
function* requestPatchChoiceGroup({ payload }: Action<ChoiceGroup>) {
  yield put(startDialogLoading());
  const result: AxiosResponse<ChoiceGroup> = yield call([fetchr, fetchr.update], Const.CHOICEGROUPS_SERVICE, {}, payload, {});
  yield put(updateChoiceGroup(result.data));
  yield put(endDialogLoading());
  yield put(closeUpdateChoiceDialog());
  yield put(openSnackBar("グループを編集しました"));
}

/**
 * チョイスグループの削除をリクエストし、削除されたグループをStateから削除する
 * */
function* requestDeleteChoiceGroup({payload}: Action<string>){
  yield put(startDialogLoading());
  const result: AxiosResponse<string> = yield call([fetchr, fetchr.delete], Const.CHOICEGROUPS_SERVICE, { groupId: payload }, {});
  console.log(result);
  yield put(removeChoiceGroup(result.data));
  yield put(endDialogLoading());
  yield put(closeRemoveChoiceDialog());
  yield put(openSnackBar("グループを削除しました"));
}

export const choiceGroupsSaga = [
  takeEvery(FETCH_CHOICEGROUPS, requestFetchChoiceGroup), 
  takeEvery(POST_CHOICEGROUP, requestPostChoiceGroup), 
  takeEvery(PATCH_CHOICEGROUP, requestPatchChoiceGroup), 
  takeEvery(DELETE_CHOICEGROUP, requestDeleteChoiceGroup),
];

export default handleActions<ChoiceGroups, any>({
  [SET_CHOICEGROUPS]: (state: ChoiceGroups, { payload }: Action<ChoiceGroups>) => ([
    ...payload,
  ]),
  [ADD_CHOICEGROUP]: (state: ChoiceGroups, { payload }: Action<ChoiceGroup>) => ([
    ...state,
    payload,
  ]),
  [UPDATE_CHOICEGROUP]: (state: ChoiceGroups, { payload }: Action<ChoiceGroup>) => {
   const newState = state.map((group) => {
     if (group.groupId === payload.groupId) {
      return { ...payload }
     }
     return group;
   });
   return newState;
  },
  [REMOVE_CHOICEGROUP]: (state: ChoiceGroups, { payload }: Action<string>) => {
    return state.filter((group) => group.groupId !== payload);
  },
}, INITIAL_STATE)
