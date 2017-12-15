import './styles/register.css';
import React, { Component } from 'react';
import RegisterTask from './../../requests/tasks/register_task';
import Translator from './../../utils/translator';
import Util from './../../utils/util';

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

    async handleSubmit(e) {
        e.preventDefault();
        try {
            const request = {
                user: this.state.form_data
            }
            const response = await Util.performSimpleRequest(RegisterTask, request);
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
            <div className='register'>
                <h1>Registro</h1>
                <form onSubmit={this.handleSubmit} className="form">
                    {this.renderInput('first_name')}
                    {this.renderInput('last_name')}
                    {this.renderInput('email')}
                    {this.renderInput('password', 'password')}
                    {this.renderInput('password_confirmation', 'password')}
                    <button>Enviar</button>
                </form>
            </div>
        )
    }
}

export default Register;