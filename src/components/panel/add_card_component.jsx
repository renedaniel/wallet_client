import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardTask from './../../requests/tasks/add_card_task';
import Validator from './../../utils/validator';
import Translator from './../../utils/translator';
import Util from './../../utils/util';
import { receiveCard } from './../../actions/card_action';
import PropTypes from 'prop-types';

class AddCard extends Component {

    constructor(params) {
        super(params);

        const expiration_metadata = Translator.get('expiration_metadata');
        this.expiration_metadata = JSON.parse(expiration_metadata);

        this.state = {
            form_data: {
                card_number: '',
                full_name: '',
                month: this.expiration_metadata.months[0],
                year: this.expiration_metadata.years[0],
                cvc: ''

            },
            errors: {}
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeMonth = this.changeMonth.bind(this);
        this.changeYear = this.changeYear.bind(this);
    }

    getErrors() {
        const errors = {}
        const { card_number, full_name, cvc } = this.state.form_data;
        Validator.setError('card_number', card_number, Validator.isNotEmpty, 'Debes ingresar el número de tarjeta', errors);
        Validator.setError('full_name', full_name, Validator.isNotEmpty, 'Debes ingresar el nombre del titular', errors);
        Validator.setError('cvc', cvc, Validator.isNotEmpty, 'Debes ingresar el CVC', errors);
        return Object.keys(errors).length ? errors : false;
    }

    async handleSubmit(e) {
        e.preventDefault();
        const errors = this.getErrors();
        if (errors) return this.setState({ errors });
        try {
            const data = {
                expiration: `${this.state.form_data.month}${this.state.form_data.year}`,
                card_number: this.state.form_data.card_number,
                full_name: this.state.form_data.full_name,
                cvc: this.state.form_data.cvc
            }
            const card = Util.encryptObject(data);
            const response = await Util.performSimpleRequest(CardTask, { card });
            this.props.dispatch(receiveCard(response));
            Util.sendInfo({
                title: '¡Listo!',
                message: 'Se ha agregado la tarjeta a tu cuenta'
            });
            this.props.onSelectOption('deposit');
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

    changeMonth({ target }) {
        const newState = this.state;
        newState.form_data.month = target.value;
        this.setState(newState);
    }

    changeYear({ target }) {
        const newState = this.state;
        newState.form_data.year = target.value;
        this.setState(newState);
    }

    render() {
        return (
            <div className='container'>
                <h1>Agrega tarjeta</h1>
                <form className="container" onSubmit={this.handleSubmit}>
                    {this.renderInput('card_number')}
                    {this.renderInput('full_name')}
                    <div className="row">
                        <div className={`col-md-6 mb-1`}>
                            <label>Mes</label>
                            <select onChange={this.changeMonth} className="form-control">
                                {
                                    this.expiration_metadata.months.map(month => {
                                        return <option key={month} value={month}>{`${month}`}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className={`col-md-6 mb-1`}>
                            <label>Año</label>
                            <select onChange={this.changeYear} className="form-control">
                                {
                                    this.expiration_metadata.years.map(year => {
                                        return <option key={year} value={year}>{`${year}`}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    {this.renderInput('cvc')}
                    <div className="text-center">
                        <button className="btn btn-primary mt-2" type="submit">Enviar</button>
                    </div>
                </form>
            </div>
        )
    }
}

AddCard.propTypes = {
    onSelectOption: PropTypes.func
}

AddCard.defaultProps = {
    onSelectOption: () => { }
}
export default connect()(AddCard);