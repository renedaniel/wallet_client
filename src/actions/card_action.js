export const RECEIVE_CARDS = 'RECEIVE_CARDS';
export const RECEIVE_CARD = 'RECEIVE_CARD';
export const DELETE_CARD = 'DELETE_CARD';
export const receiveCards = (cards) => ({ type: RECEIVE_CARDS, cards });
export const receiveCard = (card) => ({ type: RECEIVE_CARD, card });
export const deleteCard = (card_id) => ({ type: DELETE_CARD, card_id });