import { useState } from 'react';
import authService from '../../services/authService.js';
import classes from './Register.module.css';

import Alert from '../Shared/Alert/Alert';
import Spinner from '../Shared/Spinner/Spinner';

const Register = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const onSubmit = (event) => {
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

        register({ email, username, password });
    }

    const register = async (data) => {
        setIsLoading(true);

        const result = await authService.register(data);

        if (result.ok) {
            props.redirect(props.history, '/Calendar', true);
        } else {
            setErrorMessages(result.errorMessages);
        }

        setIsLoading(false);
    }

    if (isLoading) {
        return <Spinner />
    }

    const alerts = [];
    if (errorMessages.length > 0) {
        alerts.push(errorMessages.forEach((message, index) => {
            return <Alert alert='danger' message={message} key={index} />;
        }));
    }

    return (
        <div className={classes.RegisterContainer}>
            <p className={classes.Slogan}>Register your reactive account</p>
            <form onSubmit={onSubmit}>
                {alerts}
                <div className="form-group">
                    <label htmlFor='email'>Email address</label>
                    <input
                        id='email'
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        name='email'
                    />
                </div>

                <div className="form-group">
                    <label htmlFor='username'>Username</label>
                    <input
                        id='username'
                        type="text"
                        className="form-control"
                        placeholder="Enter your username"
                        name='username'
                    />
                </div>

                <div className="form-group">
                    <label htmlFor='password'>Password</label>
                    <input
                        id='password'
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                        name='password'
                    />
                </div>

                <div className="form-group">
                    <label htmlFor='repeatPassword'>Repeat password</label>
                    <input
                        id='repeatPassword'
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

export default Register;