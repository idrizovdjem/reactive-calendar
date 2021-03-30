import React, { Component } from 'react';
import classes from './Login.module.css';

class Login extends Component {
    login = (event) => {
        event.preventDefault();
        // TODO: implement login
    }

    render() {
        return (
            <div className={classes.LoginContainer}>
                <p className={classes.Slogan}>Log in to your reactive account</p>
                <form>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter your email" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter your password" />
                    </div>

                    <button onClick={this.login} className="btn btn-primary w-100">Log in</button>
                </form>
            </div>
        );
    }
}

export default Login;