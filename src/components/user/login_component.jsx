//import './styles/Login.css';
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
            window.location = '/register';
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
            <div>
                <input type={type} id={`${key}`} onChange={this.handleChange} value={this.state.form_data[key]} />
                {error && <span>{Translator.get(error)} </span>}
            </div>
        );
    }

    render() {
        return (
            <div className='Login'>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit} className="form">
                    {this.renderInput('email')}
                    {this.renderInput('password', 'password')}
                    <button>Enviar</button>
                </form>
            </div>
        )
    }
}

export default Login;