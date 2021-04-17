import React, { Component } from 'react';
import classes from './Navigation.module.css';
import {  withRouter } from 'react-router-dom';

import authService from '../../services/authService.js';

class Navigation extends Component {
    state = {
        showMobile: false
    }

    redirect = (page) => {
        this.props.redirect(this.props.history, page);
    }

    logout = () => {
        this.setState({ showMobile: false });
        authService.logout();
        this.props.redirect(this.props.history, '/Login', false);
    }

    toggleMobileButtons = () => {
        this.setState({ showMobile: !this.state.showMobile });
    }

    render() {
        let mobileButtons = null;
        if (this.props.isAuthenticated) {
            mobileButtons = (
                <span>
                    <div onClick={() => this.redirect('/Calendar')} className={classes.MobileLink}>Calendar</div>
                    <div onClick={() => this.redirect('/Overview')} className={classes.MobileLink}>Overview</div>
                    <div onClick={this.logout} className={classes.MobileLink}>Logout</div>
                </span>
            );
        } else {
            mobileButtons = (
                <span>
                    <div onClick={() => this.redirect('/Login')} className={classes.MobileLink}>Login</div>
                    <div onClick={() => this.redirect('/Register')} className={classes.MobileLink}>Register</div>
                </span>
            );
        }

        let buttons = null;
        if (this.props.isAuthenticated) {
            buttons = (
                <span>
                    <button onClick={this.logout} className={classes.NavigationButton}>Logout</button>
                    <button onClick={() => this.redirect('/Overview')} className={classes.NavigationButton}>Overview</button>
                    <button onClick={() => this.redirect('/Calendar')} className={classes.NavigationButton}>Calendar</button>
                </span>
            );
        } else {
            buttons = (
                <span>
                    <button onClick={() => this.redirect('/Register')} className={classes.NavigationButton}>Register</button>
                    <button onClick={() => this.redirect('/Login')} className={classes.NavigationButton}>Login</button>
                </span>
            );
        }

        const mobileButtonsStyle = {
            display: this.state.showMobile ? 'block' : 'none'
        };

        return (
            <nav className={classes.Navigation}>
                <span onClick={() => this.redirect('/')} to='/' className={classes.Logo}>Reactive Calendar</span>
                {buttons}

                <div onClick={this.toggleMobileButtons} className={classes.Burger}>
                    <div className={classes.Slice}></div>
                    <div className={classes.Slice}></div>
                    <div className={classes.Slice}></div>
                </div>

                <div style={mobileButtonsStyle} className={classes.MobileButtons}>
                    {mobileButtons}
                </div>
            </nav>
        );
    }
}

export default withRouter(Navigation);