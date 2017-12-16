import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteCard } from './../../actions/card_action';
import { showModal, MODAL_SIMPLE } from './../../actions/modal_action';
import { showLoader, hideLoader } from './../../actions/spinner_action';
import PropTypes from 'prop-types';
import DeleteCardTask from './../../requests/tasks/delete_card_task';
import Util from './../../utils/util';
import Notification from 'izitoast';

class CardsCard extends PureComponent {

    async deleteCard(card_id, cb = () => { }) {
        try {
            const request = { card_id }
            const response = await Util.performSimpleRequest(DeleteCardTask, request);
            this.props.deleteCard(card_id);
            cb(response);
            Notification.show({
                title: 'Hey',
                message: 'What would you like to add?'
            });

        } catch (errors) {
            this.setState({ errors });
        }
    }

    handleDelete(card_id) {
        this.props.showModal({
            modalType: MODAL_SIMPLE,
            modalProps: {
                content: '¿Estás seguro?',
                buttons: [
                    {
                        content: 'Si',
                        selected: true,
                        onClick: () => {
                            this.props.showLoader();
                            this.deleteCard(card_id, this.props.hideLoader);
                        }
                    }
                ]
            }
        });
    }

    render() {
        return (
            <div className='card cards-card panel'>
                <div className='title cards'>
                    <span>Tarjetas</span>
                </div>
                <div className='list cards-list'>
                    {this.props.cards.length ?
                        <ul>
                            <li>
                                {
                                    this.props.cards.map(card => {
                                        return (
                                            <div key={card.id} className='card-item'>
                                                <span>{`Terminación ${card.number_mask}`} </span>
                                                <a onClick={e => { this.handleDelete(card.id) }} >
                                                    <i class="mi mi-delete danger" />
                                                </a>
                                            </div>
                                        )
                                    })
                                }
                            </li>
                        </ul> :
                        <span className='small-info'>No tienes tarjetas registradas</span>
                    }
                </div>
                <span><a>Agregar tarjeta</a></span>
            </div>
        )
    }

}

CardsCard.propTypes = {
    cards: PropTypes.array
}

CardsCard.defaultProps = {
    cards: []
}

const mapDispatchToProps = dispatch => bindActionCreators({
    showModal,
    showLoader,
    hideLoader,
    deleteCard
}, dispatch);
export default connect(null, mapDispatchToProps)(CardsCard);