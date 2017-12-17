export const RECEIVE_ACCOUNT = 'RECEIVE_ACCOUNT';
export const RECEIVE_AMOUNT = 'RECEIVE_AMOUNT';
export const receiveAccount = (account) => ({ type: RECEIVE_ACCOUNT, account });
export const receiveAmount = (amount) => ({ type: RECEIVE_AMOUNT, amount });