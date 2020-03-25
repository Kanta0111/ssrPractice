import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import longos from '../modules/longos';
import addDialogState from './addDialogState';
import updateDialogState from './updateDialogState';
import removeDialogState from './removeDialogState';
import snackBarState from './snackBarState';
import loading from './loading';
import isMounted from '../modules/isMounted';
import userInfo from '../modules/userInfo';
import login from '../modules/login';

const createReducer = (history :any) => {
    return combineReducers({
        longos,
        addDialogState,
        removeDialogState,
        updateDialogState,
        snackBarState,
        isMounted,
        loading,
        userInfo,
        login,
        form: formReducer,
        router: connectRouter(history),
    });
}

export default createReducer;
