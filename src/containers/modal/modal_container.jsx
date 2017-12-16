import React from 'react';
import { connect } from 'react-redux';
import ModalSimple from './modal_simple_container';

import {
    MODAL_SIMPLE
} from './../../actions/modal_action';

const MODAL_COMPONENTS = (() => {
    const components = {};
    components[MODAL_SIMPLE] = ModalSimple;
    return components;
})();

const ModalContainer = props => {
    const { modalType, modalProps } = props;
    if (!modalType || !MODAL_COMPONENTS[modalType]) return null;
    const Modal = MODAL_COMPONENTS[modalType];
    return <Modal {...modalProps} />
}

export default connect(state => state.modal)(ModalContainer);
