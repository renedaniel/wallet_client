import { combineReducers } from 'redux';
import user from './user_reducer';
import modal from './modal_reducer';
import spinner from './spinner_reducer';

export default combineReducers({
    user,
    modal,
    isLoading: spinner
});
