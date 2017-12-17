import React, { Component } from 'react';
import LoginTask from './../../requests/tasks/login_task';
import Translator from './../../utils/translator';
import Util from './../../utils/util';
import Validator from './../../utils/validator';

class Login extends Component {

    constructor(params) {
        super(params);

        this.state = {
            form_data: {
                email: '',
                password: '',
            },
            errors: {}
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getErrors() {
        const errors = {}
        const { email, password } = this.state.form_data;
        Validator.setError('email', email, Validator.isNotEmpty, 'Debes ingresar tu email', errors);
        Validator.setError('password', password, Validator.isNotEmpty, 'Debes ingresar tu password', errors);
        Validator.setError('email', email, Validator.isValidEmail, 'Debes ingresar un email válido', errors);
        return Object.keys(errors).length ? errors : false;
    }

    async handleSubmit(e) {
        e.preventDefault();
        const errors = this.getErrors();
        if (errors) return this.setState({ errors });
        try {
            const auth = this.state.form_data
            const response = await Util.performSimpleRequest(LoginTask, { auth });
            localStorage.setItem("jwt", response.jwt);
            window.location = '/';
        } catch (errors) {
            Util.sendError({
                title: 'Usuario inválido',
                message: 'Por favor verfica tu información',
            });
        }
    }

    handleChange({ target }) {
        const newState = this.state;
        newState.form_data[target.id] = target.value;
        delete newState.errors[target.id];
        this.setState(newState);
    }

    render() {
        return (
            <div className='container'>
                <h1>{Translator.get('login_header_label', '¡Inicia tu sesión!')}</h1>
                <form className="container" onSubmit={this.handleSubmit}>
                    <div className="row">
                        {Util.renderInput('email', this.state.form_data.email, this.state.errors.email, this.handleChange)}
                    </div>
                    <div className="row">
                        {Util.renderInput('password', this.state.form_data.password, this.state.errors.password, this.handleChange, 'password')}
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary" type="submit">Enviar</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;