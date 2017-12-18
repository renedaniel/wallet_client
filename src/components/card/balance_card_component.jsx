import React from 'react';
import { connect } from 'react-redux';
import Util from './../../utils/util';
import PropTypes from 'prop-types';

const BalanceCard = (props) => {
    return (
        <div className='card col-sm-6 mb-3 col-md-12'>
            <div className='card-block'>
                <h4 className='card-title'>Cuenta</h4>
                <h6 className='card-subtitle mb-2 text-muted'>{`${props.account.account_number}`}</h6 >
                <h4 className='card-title'>Saldo</h4>
                <h6 className='card-subtitle mb-2 text-muted'>{`${Util.formatAmount(props.account.balance)}`}</h6 >
                <a href="#" onClick={() => props.onSelectOption('history')} className="card-link">Historial</a>
                <a href="#" onClick={() => props.onSelectOption('withdraw')} className="card-link">Retirar</a>
                <a href="#" onClick={() => props.onSelectOption('deposit')} className="card-link">Recargar</a>
                <a href="#" onClick={() => props.onSelectOption('transfer')} className="card-link">Transferir</a>
            </div>
        </div>
    )
}

BalanceCard.propTypes = {
    onSelectOption: PropTypes.func
}

BalanceCard.defaultProps = {
    onSelectOption: () => { }
}

const mapStateToProps = state => ({ account: state.account });
export default connect(mapStateToProps)(BalanceCard);