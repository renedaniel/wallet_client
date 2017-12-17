import React, { Component } from 'react';
import LoginTask from './../../requests/tasks/login_task';
import Translator from './../../utils/translator';
import Util from './../../utils/util';

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

    async handleSubmit(e) {
        e.preventDefault();
        try {
            const auth = this.state.form_data
            const response = await Util.performSimpleRequest(LoginTask, { auth });
            localStorage.setItem("jwt", response.jwt);
            window.location = '/';
        } catch (errors) {
            //TODO client validations
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
                <h1>¡Inicia tu sesión!</h1>
                <form className="container" onSubmit={this.handleSubmit}>
                    <div className="row">
                        {Util.renderInput('email', this.state.email, false, this.handleChange)}
                    </div>
                    <div className="row">
                        {Util.renderInput('password', this.state.password, false, this.handleChange, 'password')}
                    </div>
                    <button className="btn btn-primary" type="submit">Enviar</button>
                </form>
            </div>
        )
    }
}

export default Login;