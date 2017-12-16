import './styles/modal.css';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HIDE_MODAL } from './../../actions/modal_action';

class ModalSimple extends PureComponent {

    renderButtons(buttons = []) {
        return buttons.map(button => {
            const class_name = button.class_name ? button.class_name : '';
            return <a
                {...button.props}
                className={`modal-button ${class_name} ${button.selected ? 'selected' : ''}`}
                key={button.content}
                onClick={() => {
                    button.onClick();
                    this.props.dispatch({ type: HIDE_MODAL });
                }}
            >
                {button.content}
            </a>
        }, this)
    }

    renderOptionalChild(prop_name, content) {
        const key = prop_name.split('-')[0];
        if (!key || !this.props[key]) return null;
        return (
            <div key={prop_name} className={`modal-${prop_name}`} >
                {content}
            </div>
        )
    }

    render() {
        const content = [];
        content.push(this.renderOptionalChild('title', <h3>{this.props.title} </h3>));
        content.push(this.renderOptionalChild('content', <p>{this.props.content} </p>));
        content.push(this.renderOptionalChild('buttons', this.renderButtons(this.props.buttons)));

        return (
            <div className="modal-overlay">
                <div className={`modal-container ${this.props.className}`}> {content} </div >
            </div>
        )
    }
}

ModalSimple.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    buttons: PropTypes.array,
    className: PropTypes.string,
}

ModalSimple.defaultProps = {
    className: ''
}

export default connect()(ModalSimple);
