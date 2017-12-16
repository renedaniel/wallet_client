import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardTask from './../../requests/tasks/add_card_task';
import Translator from './../../utils/translator';
import Util from './../../utils/util';
import { receiveCard } from './../../actions/card_action';

class AddCard extends Component {

    constructor(params) {
        super(params);

        this.state = {
            form_data: {
                card_number: '',
                full_name: '',
                expiration: '',
                cvc: ''
            },
            errors: {}
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        try {
            const card = Util.encryptObject(this.state.form_data);
            const response = await Util.performSimpleRequest(CardTask, { card });
            this.props.dispatch(receiveCard(response));
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

    renderInput(key, type = 'text') {
        const error = this.state.errors[key] && this.state.errors[key][0] || false;
        return (
            <div className={`form-group ${error ? 'error' : ''}`}>
                <input
                    type={type}
                    id={`${key}`}
                    onChange={this.handleChange}
                    value={this.state.form_data[key]}
                    placeholder={Translator.get(`register_placeholder_${key}`)}
                />
                {error && <span className="error">{Translator.get(error)} </span>}
            </div>
        );
    }

    render() {
        return (
            <div className='panel panel-add-card'>
                <h1>Agrega tarjeta</h1>
                <form onSubmit={this.handleSubmit} className="form">
                    {this.renderInput('card_number')}
                    {this.renderInput('full_name')}
                    {this.renderInput('expiration')}
                    {this.renderInput('cvc', 'password')}
                    <button className="button button-info">Enviar</button>
                </form>
            </div>
        )
    }
}

export default connect()(AddCard);