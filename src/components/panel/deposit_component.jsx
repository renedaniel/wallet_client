import React, { Component } from 'react';
import { connect } from 'react-redux';
import DepositToAccount from './../../requests/tasks/deposit_to_account_task';
import Translator from './../../utils/translator';
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
                card_id: props.cards.length ? `${props.cards[0].id}` : null
            },
            errors: {}
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const form_data = this.state.form_data;
        const card_id = nextProps.cards.length ? `${nextProps.cards[0].id}` : null;
        form_data.card_id = card_id;
        this.setState({ form_data });
    }

    getErrors() {
        const errors = {}
        const { amount } = this.state.form_data;
        Validator.setError('amount', amount, Validator.isNotEmpty, 'Debes ingresar una cantidad', errors);
        Validator.setError('amount', amount, Validator.isValidAmount, 'Debes ingresar una cantidad válida', errors);
        return Object.keys(errors).length ? errors : false;
    }

    async handleSubmit(e) {
        e.preventDefault();
        const errors = this.getErrors();
        if (errors) return this.setState({ errors });
        try {
            const data = Util.encryptObject(this.state.form_data);
            const response = await Util.performSimpleRequest(DepositToAccount, { data });
            this.props.dispatch(receiveAmount(parseFloat(this.state.form_data.amount)));
            Util.sendInfo({
                title: '¡Listo!',
                message: 'Has depositado a tu cuenta'
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

    renderSelect() {
        return (
            <div className="row">
                <div className={`col-md-12 mb-5`}>
                    <label> Selecciona tu tarjeta </label>
                    <select className="form-control">
                        {
                            this.props.cards.map(card => {
                                return <option key={card.id} value={card.id}>{`${card.number_mask}`}</option>
                            })
                        }
                    </select>
                </div>
            </div>
        )
    }

    render() {
        if (!this.props.cards.length) {
            return (
                <div className="row text-center">
                    <div className="col-sm-12 mt-10">
                        <h4>No tienes tarjetas registradas</h4>
                        <p>Para poder realizar un depósito debes de registrar una tarjeta</p>
                        <button onClick={() => this.props.onSelectOption('addCard')} className="btn-lg">Agregar una tarjeta</button>
                    </div>
                </div>
            )
        }
        return (
            <div className='container'>
                <h1>¡Deposita a tu cuenta!</h1>
                <form className="container" onSubmit={this.handleSubmit}>
                    {this.renderInput('amount')}
                    {this.renderSelect()}
                    <TaxInfo amount={parseFloat(this.state.form_data.amount)} />
                    {this.state.form_data.amount.length > 0 &&
                        <div className="text-center">
                            <button className="btn btn-primary mt-2" type="submit">¡Depositar!</button>
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

const mapStateToProps = state => ({ cards: state.cards });
export default connect(mapStateToProps)(DepositForm);