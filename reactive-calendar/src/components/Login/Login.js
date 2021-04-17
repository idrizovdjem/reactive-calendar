import React, { Component } from 'react';
import classes from './Login.module.css';

import authService from '../../services/authService.js';

import Alert from '../Shared/Alert/Alert';
import Spinner from '../Shared/Spinner/Spinner';

class Login extends Component {
    state = {
        isLoading: false,
        errorMessages: []
    }

    onSubmit = async (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        // * validations
        if(!email || email.length < 5) {
            alert('Email is required!');
            return;
        }

        if(!password || password.length < 6) {
            alert('Password must be at least 6 symbols!');
            return;
        }

        this.login({ email, password });
    }

    login = async (data) => {
        this.setState({ isLoading: true });

        const result = await authService.login(data);

        if (result.successfull) {
            this.setState({ isLoading: false });
            this.props.redirect(this.props.history, '/Calendar', true);
        } else {
            this.setState({
                errorMessages: [...result.errorMessages],
                isLoading: false
            });
        }
    }

    render() {
        const spinner = this.state.isLoading ? <Spinner /> : null;

        const alerts = [];
        this.state.errorMessages.forEach((message, index) => {
            alerts.push(<Alert alert='danger' message={message} key={index} />)
        });

        return (
            <div className={classes.LoginContainer}>
                {spinner}
                <p className={classes.Slogan}>Log in to your reactive account</p>
                <form onSubmit={this.onSubmit}>
                    {alerts}
                    <div className="form-group">
                        <label>Email address</label>
                        <input 
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            name='email' 
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            name='password'
                        />
                    </div>

                    <button className="btn btn-primary w-100">Log in</button>
                </form>
            </div>
        );
    }
}

export default Login;