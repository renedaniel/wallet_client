import './styles/panel.css';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import BalanceCard from './../card/balance_card_component';
import CardsCard from './../card/cards_card_component';
import AddCard from './../panel/add_card_component';

class UserPanel extends PureComponent {
    render() {
        return (
            <div className='panel user-panel'>
                <div className='left-side'>
                    <BalanceCard />
                    <CardsCard cards={this.props.user.cards} />
                </div>
                <div className='right-side'>
                    <AddCard />
                </div>
            </div>
        )
    }
}

UserPanel.propTypes = {
    user: PropTypes.shape({
        cards: PropTypes.array
    }),
}

UserPanel.defaultProps = {
    user: {
        cards: []
    }
}

export default UserPanel;