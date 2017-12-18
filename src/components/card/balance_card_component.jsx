import React from 'react';
import { connect } from 'react-redux';
import Util from './../../utils/util';
import PropTypes from 'prop-types';

const BalanceCard = (props) => {
    const { currentPanel } = props;
    return (
        <div className='card col-sm-6 mb-3 col-md-12 balance'>
            <div className='card-block'>
                <h4 className='card-title'>Cuenta</h4>
                <h6 className='card-subtitle mb-2 text-muted'>{`${props.account.account_number}`}</h6 >
                <h4 className='card-title'>Saldo</h4>
                <h6 className='card-subtitle mb-2 text-muted'>{`${Util.formatAmount(props.account.balance)}`}</h6 >
                <a onClick={() => props.onSelectOption('history')} className={`card-link ${currentPanel == 'history' ? 'selected' : ''}`}>Historial</a>
                <a onClick={() => props.onSelectOption('withdraw')} className={`card-link ${currentPanel == 'withdraw' ? 'selected' : ''}`}>Retirar</a>
                <a onClick={() => props.onSelectOption('deposit')} className={`card-link ${currentPanel == 'deposit' ? 'selected' : ''}`}>Recargar</a>
                <a onClick={() => props.onSelectOption('transfer')} className={`card-link ${currentPanel == 'transfer' ? 'selected' : ''}`}>Transferir</a>
            </div>
        </div>
    )
}

BalanceCard.propTypes = {
    onSelectOption: PropTypes.func,
    currentPanel: PropTypes.string
}

BalanceCard.defaultProps = {
    onSelectOption: () => { },
    currentPanel: 'deposit'
}

const mapStateToProps = state => ({ account: state.account });
export default connect(mapStateToProps)(BalanceCard);