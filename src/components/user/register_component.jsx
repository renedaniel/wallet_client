import './styles/register.css';
import React, { Component } from 'react';
import RegisterTask from './../../requests/tasks/register_task';
import Request from './../../requests/request_manager';

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
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        try {
            const task = new RegisterTask(this.state.form_data);
            const response = await Request.addRequest(task);
            debugger
        } catch (error) {
            console.error('Register [handleSubmit]', error);
        }
    }

    handleChange({ target }) {
        const newState = this.state;
        newState.form_data[target.id] = target.value;
        this.setState(newState);
    }

    renderInput(key, type = 'text') {
        return <input type={type} id={`${key}`} onChange={this.handleChange} value={this.state.form_data[key]} />
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