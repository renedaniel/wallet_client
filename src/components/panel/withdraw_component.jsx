import React, { Component } from 'react';
import { connect } from 'react-redux';
import WithdrawTask from './../../requests/tasks/withdraw_task';
import Util from './../../utils/util';
import Validator from './../../utils/validator';
import { receiveAmount } from './../../actions/account_action';
import TaxInfo from './../panel/tax_component';
import PropTypes from 'prop-types';

class DepositForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            form_data: {
                amount: '',
                bank_account: ''
            },
            errors: {}
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getErrors() {
        const errors = {}
        const { amount, bank_account } = this.state.form_data;
        Validator.setError('amount', amount, Validator.isNotEmpty, 'Debes ingresar una cantidad', errors);
        Validator.setError('amount', amount, Validator.isValidAmount, 'Debes ingresar una cantidad válida', errors);
        Validator.setError('bank_account', bank_account, Validator.isNotEmpty, 'Debes ingresar el número de cuenta', errors);
        return Object.keys(errors).length ? errors : false;
    }

    async handleSubmit(e) {
        e.preventDefault();
        const errors = this.getErrors();
        if (errors) return this.setState({ errors });
        try {
            const data = Util.encryptObject(this.state.form_data);
            const response = await Util.performSimpleRequest(WithdrawTask, { data });
            const { total } = Util.calcTax(this.state.form_data.amount);
            this.props.dispatch(receiveAmount(- total));
            Util.sendInfo({
                title: '¡Listo!',
                message: 'Has retirado de tu cuenta'
            });
        } catch (errors) {
            this.setState({ errors });
        }
    }

    handleChange({ target }) {
        const newState = this.state;
        newState.form_data[target.id] = target.value;
        delete newState.errors[target.id];
        this.setState(newState);
    }

    renderInput(key, type = 'text', mb = 1) {
        const error = this.state.errors[key];
        return (
            <div className="row">
                {Util.renderInput(key, this.state[key], error, this.handleChange, type, mb)}
            </div>
        );
    }

    render() {
        if (!this.props.account.balance) {
            return (
                <div className="row text-center">
                    <div className="col-sm-12 mt-10">
                        <h4>No tienes dinero en tu cuenta</h4>
                        <p>Para poder realizar un retiro, debes recargar tu cuenta</p>
                        <button onClick={() => this.props.onSelectOption('deposit')} className="btn-lg">¡Recargar!</button>
                    </div>
                </div>
            )
        }
        return (
            <div className='container'>
                <h1>¡Transfiere a una cuenta bancaria!</h1>
                <form className="container" onSubmit={this.handleSubmit}>
                    {this.renderInput('bank_account')}
                    {this.renderInput('amount')}
                    <TaxInfo amount={parseFloat(this.state.form_data.amount)} />
                    {this.state.form_data.amount.length > 0 &&
                        <div className="text-center">
                            <button className="btn btn-primary mt-2" type="submit">¡Transferir!</button>
                        </div>
                    }
                </form>
            </div>
        )
    }
}

DepositForm.propTypes = {
    onSelectOption: PropTypes.func
}

DepositForm.defaultProps = {
    onSelectOption: () => { }
}

const mapStateToProps = state => ({ account: state.account });
export default connect(mapStateToProps)(DepositForm);