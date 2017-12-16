export const RECEIVE_CARD = 'RECEIVE_CARD';
export const DELETE_CARD = 'DELETE_CARD';
export const receiveCard = (card) => ({ type: RECEIVE_CARD, card });
export const deleteCard = (card_id) => ({ type: DELETE_CARD, card_id });