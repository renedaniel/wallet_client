import {
    RECEIVE_ACCOUNT,
    RECEIVE_AMOUNT
} from './../actions/account_action';

function reducer(state = {}, action = {}) {
    switch (action.type) {
        case RECEIVE_ACCOUNT:
            return { ...action.account }
        case RECEIVE_AMOUNT:
            const amount = action.amount;
            const balance = state.balance + amount;
            return { ...state, balance }
        default:
            return state;
    }
}

export default reducer;
