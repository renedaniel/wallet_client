import IsLoggedIn from './../requests/tasks/is_logged_in_task';
import Util from './../utils/util';
import { receiveCards } from './card_action';
import { receiveAccount } from './account_action';

export const RECEIVE_IS_LOGGED_IN = 'RECEIVE_IS_LOGGED_IN';
export const RECEIVE_ANONYMOUS = 'RECEIVE_IS_LOGGED_IN';

export const receiveIsLoggedIn = (user) => ({ type: RECEIVE_IS_LOGGED_IN, user });
export const receiveAnonymous = () => ({ type: RECEIVE_ANONYMOUS, user: { is_logged: false } });

export const fetchIsLoggedIn = () => dispatch => {
    const jwt = localStorage.getItem('jwt');
    return Util.performSimpleRequest(IsLoggedIn, { jwt })
        .then(response => {
            const user = {
                is_logged: true,
                ...response
            }
            dispatch(receiveIsLoggedIn(user));
            dispatch(receiveCards(user.cards))
            dispatch(receiveAccount(user.account))
        })
        .catch(response => {
            dispatch(receiveAnonymous());
        });
};