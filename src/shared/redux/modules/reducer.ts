import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import longos from '../modules/longos';
import addDialogState from './addDialogState';
import updateDialogState from './updateDialogState';

const createReducer = (history :any) => {
    return combineReducers({
        longos,
        addDialogState,
        updateDialogState,
        form: formReducer,
        router: connectRouter(history),
    });
}

export default createReducer;