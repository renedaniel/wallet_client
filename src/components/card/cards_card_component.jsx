import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DeleteCardTask from './../../requests/tasks/delete_card_task';
import Util from './../../utils/util';
import { deleteCard } from './../../actions/card_action';

class CardsCard extends PureComponent {

    shouldComponentUpdate(nextProps, nextState){
        return this.props.cards.length !== nextProps.cards.length
    }

    async deleteCard(card_id) {
        try {
            const request = { card_id }
            const response = await Util.performSimpleRequest(DeleteCardTask, request);
            this.props.dispatch(deleteCard(card_id));
        } catch (errors) {
            this.setState({ errors });
        }
    }

    render() {
        return (
            <div className='card cards-card'>
                <span>Tarjetas</span>
                <div className='cards-list'>
                    {
                        this.props.cards.map(card => {
                            return (
                                <div key={card.id} className='card-item'>
                                    <span>{`Terminación ${card.number_mask}`} </span>
                                    <a onClick={e => { this.deleteCard(card.id) }} >Eliminar</a>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='links'>
                    <a>Agregar</a>
                </div>
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

export default connect()(CardsCard);