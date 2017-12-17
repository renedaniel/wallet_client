import React from 'react';
import { connect } from 'react-redux';

const BalanceCard = (props) => {
    return (
        <div className='card col-sm-6 mb-3 col-md-12'>
            <div className='card-block'>
                <h4 className='card-title'>Cuenta</h4>
                <h6 className='card-subtitle mb-2 text-muted'>{`${props.user.account.account_number}`}</h6 >
                <h4 className='card-title'>Saldo</h4>
                <h6 className='card-subtitle mb-2 text-muted'>{`$${props.user.account.balance}`}</h6 >
                <a href="#" className="card-link">Historial</a>
                <a href="#" className="card-link">Retirar</a>
                <a href="#" className="card-link">Recargar</a>
                <a href="#" className="card-link">Transferir</a>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({ user: state.user });
export default connect(mapStateToProps)(BalanceCard);