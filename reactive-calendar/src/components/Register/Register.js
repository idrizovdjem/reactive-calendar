import React, { Component } from 'react';
import authService from '../../services/authService.js';
import classes from './Register.module.css';

import Alert from '../Alert/Alert';
import Spinner from '../Spinner/Spinner';

class Register extends Component {
    state = {
        isLoading: false,
        errorMessages: []
    }

    onSubmit = (event) => {
        event.preventDefault();

        const email = event.target.email.value.trim();
        const username = event.target.username.value.trim();
        const password = event.target.password.value.trim();
        const repeatPassword = event.target.repeatPassword.value.trim();

        // * validations
        if (!email || email.length < 5) {
            alert('Email is required!');
            return;
        }

        if (!username || username.length < 5) {
            alert('Username must be at least 5 symbols long!');
            return;
        }

        if (!password || password.length < 6) {
            alert('Password must be at least 6 symbols long!');
            return;
        }

        if (password !== repeatPassword) {
            alert('Passwords does not match!');
            return;
        }

        this.register({ email, username, password });
    }

    register = async (data) => {
        this.setState({ isLoading: true });

        const result = await authService.register(data);

        if(result.successfull) {
            this.setState({ isLoading: false });
            this.props.redirect(this.props.history, '/Calendar', true);
        } else {
            this.setState({
                isLoading: false,
                errorMessages: [...result.errorMessages]
            });
        }
    }

    render() {
        const spinner = this.state.isLoading ? <Spinner /> : null;

        const alerts = [];
        this.state.errorMessages.map((message, index) =>
            alerts.push(<Alert alert='danger' message={message} key={index} />));

        return (
            <div className={classes.RegisterContainer}>
                {spinner}
                <p className={classes.Slogan}>Register your reactive account</p>
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
                        <label>Username</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Enter your username" 
                            name='username' 
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

                    <div className="form-group">
                        <label>Repeat password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Repeat your password"
                            name='repeatPassword'
                        />
                    </div>

                    <button className="btn btn-primary w-100">Register</button>
                </form>
            </div>
        );
    }
}

export default Register;