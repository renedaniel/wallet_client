import React from 'react';
import { connect } from 'react-redux';

const BalanceCard = (props) => {
    return (
        <div className='card balance-card'>
            <div className='balance'>
                <span>Saldo</span>
                <span>{`$${props.user.account.balance}`}</span>
            </div>
            <div className='account'>
                <span>Cuenta</span>
                <span>{`$${props.user.account.account_number}`}</span>
            </div>
            <div className='links'>
                <a>Recargar</a>
                <a>Retirar</a>
                <a>Historial</a>
                <a>Transferir</a>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({ user: state.user });
export default connect(mapStateToProps)(BalanceCard);