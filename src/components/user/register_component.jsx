import React, { Component } from 'react';
import RegisterTask from './../../requests/tasks/register_task';
import Translator from './../../utils/translator';
import Util from './../../utils/util';
import Validator from './../../utils/validator';

class Register extends Component {

    constructor(params) {
        super(params);

        this.state = {
            form_data: {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                password_confirmation: ''
            },
            errors: {}
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getErrors() {
        const errors = {}
        const { first_name, last_name, email, password, password_confirmation } = this.state.form_data;
        Validator.setError('first_name', first_name, Validator.isNotEmpty, 'Debes ingresar tu nombre', errors);
        Validator.setError('last_name', last_name, Validator.isNotEmpty, 'Debes ingresar tus apellidos', errors);
        Validator.setError('password', password, Validator.isNotEmpty, 'Debes ingresar tu contraseña', errors);
        Validator.setError('password_confirmation', password_confirmation, Validator.isNotEmpty, 'Debes confirmar tu contraseña', errors);
        Validator.setError('email', email, Validator.isNotEmpty, 'Debes ingresar tu email', errors);
        Validator.setError('email', email, Validator.isValidEmail, 'Debes ingresar un email válido', errors);
        return Object.keys(errors).length ? errors : false;
    }

    async handleSubmit(e) {
        e.preventDefault();
        const errors = this.getErrors();
        if (errors) return this.setState({ errors });
        try {
            const request = {
                user: {
                    ...this.state.form_data
                }
            }
            const response = await Util.performSimpleRequest(RegisterTask, request);
            localStorage.setItem("jwt", response.jwt);
            window.location = '/';
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

    render() {
        const { first_name, last_name, email, password, password_confirmation } = this.state.form_data;
        const errors = this.state.errors;
        return (
            <div className='container'>
                <h1>{Translator.get('register_header_label', '¡Registrate!')}</h1>
                <form className="container" onSubmit={this.handleSubmit}>
                    <div className="row">
                        {Util.renderInput('first_name', first_name, errors.first_name, this.handleChange, 'text', 2)}
                    </div>
                    <div className="row">
                        {Util.renderInput('last_name', last_name, errors.last_name, this.handleChange, 'text', 2)}
                    </div>
                    <div className="row">
                        {Util.renderInput('email', email, errors.email, this.handleChange, 'text', 2)}
                    </div>
                    <div className="row">
                        {Util.renderInput('password', password, errors.password, this.handleChange, 'password', 2)}
                    </div>
                    <div className="row">
                        {Util.renderInput('password_confirmation', password_confirmation, errors.password_confirmation, this.handleChange, 'password', 4)}
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary" type="submit">Registrar</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Register;