import IsLoggedIn from './../requests/tasks/is_logged_in_task';
import Util from './../utils/util';

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
        })
        .catch(response => {
            dispatch(receiveAnonymous());
        });
};