import React, { Component } from 'react';
import classes from './Register.module.css';

class Register extends Component {
    register = (event) => {
        event.preventDefault();
        // TODO: implement register
    }

    render() {
        return (
            <div className={classes.RegisterContainer}>
                <p className={classes.Slogan}>Register your reactive account</p>
                <form>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter your email" />
                    </div>

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="Enter your username" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter your password" />
                    </div>

                    <div className="form-group">
                        <label>Repeat password</label>
                        <input type="password" className="form-control" placeholder="Repeat your password" />
                    </div>

                    <button onClick={this.register} className="btn btn-primary w-100">Register</button>
                </form>
            </div>
        );
    }
}

export default Register;