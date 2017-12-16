import {
    RECEIVE_IS_LOGGED_IN,
    RECEIVE_ANONYMOUS
} from './../actions/user_action';
import {
    RECEIVE_CARD,
    DELETE_CARD
} from './../actions/card_action';

function reducer(state = null, action = {}) {
    switch (action.type) {
        case RECEIVE_ANONYMOUS:
        case RECEIVE_IS_LOGGED_IN:
            const user = action.user;
            return { ...state, ...user };
        case RECEIVE_CARD:
            state.cards = [...state.cards, action.card]
            return { ...state };
        case DELETE_CARD:
            const filter = state.cards.filter(card => card.id !== action.card_id);
            state.cards = state.cards.filter(card => card.id !== action.card_id)
            return { ...state }
        default:
            return state;
    }
}

export default reducer;