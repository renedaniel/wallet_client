import React from 'react';
import { connect } from 'react-redux';

const BalanceCard = (props) => {
    return (
        <div className='card balance-card panel'>
            <div className='title account'>
                <span>Cuenta </span>
                <span>{`${props.user.account.account_number}`}</span>
            </div>
            <div className='balance'>
                <span>Saldo</span>
                <span className='amount'>{`$${props.user.account.balance}`}</span>
            </div>
            <div className='list links'>
                <ul>
                    <li>
                        <a>Recargar</a>
                        <a>Retirar</a>
                        <a>Historial</a>
                        <a>Transferir</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({ user: state.user });
export default connect(mapStateToProps)(BalanceCard);