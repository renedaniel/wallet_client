import { combineReducers } from 'redux';
import user from './user_reducer';
import cards from './card_reducer';
import modal from './modal_reducer';
import spinner from './spinner_reducer';
import account from './account_reducer';

export default combineReducers({
    isLoading: spinner,
    user,
    account,
    modal,
    cards
});
