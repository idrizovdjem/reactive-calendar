import React, { Component } from 'react';
import authService from '../../services/authService.js';
import { Redirect } from 'react-router-dom';
import classes from './Login.module.css';

import Alert from '../Alert/Alert';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            successfullLogin: false,
            errorMessages: []
        };

        this.emailInput = React.createRef(null);
        this.passwordInput = React.createRef(null);
    }

    login = async (event) => {
        event.preventDefault();

        const email = this.emailInput.current.value.trim();
        const password = this.passwordInput.current.value.trim();

        if(!email || email.length < 5) {
            alert('Email is required!');
            return;
        }

        if(!password || password.length < 6) {
            alert('Password must be at least 6 symbols!');
            return;
        }

        const result = await authService.login({ email, password });

        if (result.successfull) {
            this.setState({ successfullLogin: true });
        } else {
            this.setState({
                successfullLogin: false,
                errorMessages: [...result.errorMessages]
            });
        }
    }

    render() {
        if(this.state.successfullLogin) {
            return <Redirect to='/Calendar' />
        }

        const alerts = [];
        this.state.errorMessages.map((message, index) =>
            alerts.push(<Alert alert='danger' message={message} key={index} />));

        return (
            <div className={classes.LoginContainer}>
                <p className={classes.Slogan}>Log in to your reactive account</p>
                <form>
                    {alerts}
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter your email" ref={this.emailInput} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter your password" ref={this.passwordInput} />
                    </div>

                    <button onClick={this.login} className="btn btn-primary w-100">Log in</button>
                </form>
            </div>
        );
    }
}

export default Login;