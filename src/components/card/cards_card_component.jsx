import React from 'react';
import PropTypes from 'prop-types';

const CardsCard = (props) => {
    return (
        <div className='card cards-card'>
            <span>Tarjetas</span>
            <div className='cards-list'>
                {
                    props.cards.map(card => {
                        return <span key={card.id}>{`Terminación ${card.number_mask}`} </span>
                    })
                }
            </div>
            <div className='links'>
                <a>Agregar</a>
            </div>
        </div>
    )
}

CardsCard.propTypes = {
    cards: PropTypes.array
}

CardsCard.defaultProps = {
    cards: []
}

export default CardsCard;