import './styles/user.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BalanceCard from './../card/balance_card_component';
import CardsCard from './../card/cards_card_component';
import AddCard from './../panel/add_card_component';
import DepositForm from './../panel/deposit_component';

class UserPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rightComponent: 'deposit'
        }
        this.rightComponents = {
            'addCard': AddCard,
            'deposit': DepositForm
        }
        this.changeRightContent = this.changeRightContent.bind(this);
    }

    changeRightContent(component) {
        if (this.rightComponents[component]) {
            this.setState({ rightComponent: component });
        }
    }

    render() {
        const RightComponent = this.rightComponents[this.state.rightComponent];
        return (
            <div className='row'>
                <div className='col col-sm-12 col-lg-5'>
                    <div className='row'>
                        <BalanceCard onSelectOption={this.changeRightContent} />
                        <CardsCard onSelectOption={this.changeRightContent} />
                    </div>
                </div>
                <div className='col col-sm-12 col-lg-7'>
                    <RightComponent onSelectOption={this.changeRightContent} />
                </div>
            </div>
        )
    }
}

UserPanel.propTypes = {
    user: PropTypes.object,
}

UserPanel.defaultProps = {
    user: {}
}

export default UserPanel;