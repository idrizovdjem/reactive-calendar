import React, { Component } from 'react';
import axios from '../../axios.js';
import classes from './Register.module.css';

class Register extends Component {
    constructor(props) {
        super(props);

        this.emailInput = React.createRef(null);
        this.usernameInput = React.createRef(null);
        this.passwordInput = React.createRef(null);
        this.repeatPasswordInput = React.createRef(null);
    }

    register = async (event) => {
        event.preventDefault();

        const email = this.emailInput.current.value.trim();
        const username = this.usernameInput.current.value.trim();
        const password = this.passwordInput.current.value.trim();
        const repeatPassword = this.repeatPasswordInput.current.value.trim();

        // * validations
        if(!email || email.length < 5) {
            alert('Email is required!');
            return;
        }

        if(!username || username.length < 5) {
            alert('Username must be at least 5 symbols long!');
            return;
        }

        if(!password || password.length < 6) {
            alert('Password must be at least 6 symbols long!');
            return;
        }

        if(password !== repeatPassword) {
            alert('Passwords does not match!');
            return;
        }

        const response = await axios.post('/users/register', {
            email,
            username,
            password
        });

        const result = response.data.result;

        if(result.successfull) {
            const authToken = result.data.authToken;
            this.props.authenticate(authToken);
        }

        // TODO: check for errors
    }

    render() {
        return (
            <div className={classes.RegisterContainer}>
                <p className={classes.Slogan}>Register your reactive account</p>
                <form>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter your email" ref={this.emailInput} />
                    </div>

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="Enter your username" ref={this.usernameInput} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter your password" ref={this.passwordInput} />
                    </div>

                    <div className="form-group">
                        <label>Repeat password</label>
                        <input type="password" className="form-control" placeholder="Repeat your password" ref={this.repeatPasswordInput} />
                    </div>

                    <button onClick={this.register} className="btn btn-primary w-100">Register</button>
                </form>
            </div>
        );
    }
}

export default Register;