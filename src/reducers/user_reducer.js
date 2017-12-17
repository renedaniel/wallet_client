import {
    RECEIVE_IS_LOGGED_IN,
    RECEIVE_ANONYMOUS
} from './../actions/user_action';

function reducer(state = null, action = {}) {
    switch (action.type) {
        case RECEIVE_ANONYMOUS:
        case RECEIVE_IS_LOGGED_IN:
            const user = action.user;
            return { ...state, ...user };
        default:
            return state;
    }
}

export default reducer;
