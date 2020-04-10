import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import longos from '../modules/longos';
import addDialogState from './addDialogState';
import updateDialogState from './updateDialogState';
import removeDialogState from './removeDialogState';
import snackBarState from './snackBarState';
import dialogLoading from './dialogLoading';
import isMounted from '../modules/isMounted';
import userInfo from '../modules/userInfo';
import login from '../modules/login';
import headerLoading from '../modules/headerLoading';
import choiceGroups from '../modules/choiceGroups';
import addChoiceDialogState from './addChoiceDialogState'
import updateChoiceDialogState from './updateChoiceDialogState'

const createReducer = (history :any) => {
    return combineReducers({
        dialog: combineReducers({
          addDialogState,
          removeDialogState,
          updateDialogState,
          addChoiceDialogState,
          updateChoiceDialogState,
          dialogLoading,
        }),
        snackBarState,
        isMounted,
        headerLoading,
        app: combineReducers({
          longos,
          choiceGroups,          
        }),
        user: combineReducers({
          userInfo,
          login,
        }),
        form: formReducer,
        router: connectRouter(history),
    });
}

export default createReducer;
