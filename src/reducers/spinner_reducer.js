import { SHOW_LOADER, HIDE_LOADER } from './../actions/spinner_action';

function reducer(state = false, action) {
    switch (action.type) {
        case SHOW_LOADER:
            return true;
        case HIDE_LOADER:
            return false;
        default:
            return state;
    }
}

export default reducer;