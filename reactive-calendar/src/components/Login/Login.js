import { useState } from 'react';
import classes from './Login.module.css';

import authService from '../../services/authService.js';

import Alert from '../Shared/Alert/Alert';
import Spinner from '../Shared/Spinner/Spinner';

const Login = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const onSubmit = async (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        // * validations
        if (!email || email.length < 5) {
            alert('Email is required!');
            return;
        }

        if (!password || password.length < 6) {
            alert('Password must be at least 6 symbols!');
            return;
        }

        login({ email, password });
    }

    const login = async (data) => {
        setIsLoading(true);

        const result = await authService.login(data);

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
    errorMessages.forEach((message, index) => {
        alerts.push(<Alert alert='danger' message={message} key={index} />);
    });

    return (
        <div className={classes.LoginContainer}>
            <p className={classes.Slogan}>Log in to your reactive account</p>
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
                    <label htmlFor='password'>Password</label>
                    <input
                        id='password'
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

export default Login;