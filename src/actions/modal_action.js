export const MODAL_SIMPLE = 'MODAL_SIMPLE';
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export const showModal = ({ modalType, modalProps }) => dispatch => {
    dispatch({
        modalType,
        modalProps,
        type: SHOW_MODAL,
    });
}
