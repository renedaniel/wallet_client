import {
    RECEIVE_CARDS,
    RECEIVE_CARD,
    DELETE_CARD
} from './../actions/card_action';

function reducer(state = [], action = {}) {
    switch (action.type) {
        case RECEIVE_CARDS:
            return [ ...action.cards ]
        case RECEIVE_CARD:
            return [...state, action.card]
        case DELETE_CARD:
            const filtered = state.filter(card => card.id !== action.card_id);
            return [...filtered]
        default:
            return state;
    }
}

export default reducer;
