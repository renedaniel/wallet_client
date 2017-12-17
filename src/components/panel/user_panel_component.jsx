import './styles/user.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BalanceCard from './../card/balance_card_component';
import CardsCard from './../card/cards_card_component';
import AddCard from './../panel/add_card_component';

class UserPanel extends Component {
    render() {
        return (
            <div className='row'>
                <div className='col col-sm-12 col-lg-5'>
                    <div className='row'>
                        <BalanceCard />
                        <CardsCard />
                    </div>
                </div>
                <div className='col col-sm-12 col-lg-7'>
                    <AddCard />
                </div>
            </div>
        )
    }
}

UserPanel.propTypes = {
    user: PropTypes.object,
}

UserPanel.defaultProps = {
    user: { }
}

export default UserPanel;