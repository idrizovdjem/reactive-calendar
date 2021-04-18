import { useState } from 'react';
import classes from './Navigation.module.css';
import { withRouter } from 'react-router-dom';

import authService from '../../services/authService.js';

const Navigation = (props) => {
    const [showBurger, setShowBurger] = useState(false);

    const redirect = (page) => {
        props.redirect(props.history, page);
    }

    const logout = () => {
        setShowBurger(false);
        authService.logout();
        props.redirect(props.history, '/Login', false);
    }

    const toggleMobileButtons = () => {
        setShowBurger(oldState => !oldState);
    }

    let mobileButtons = null;
    if (props.isAuthenticated) {
        mobileButtons = (
            <span>
                <div 
                    onClick={() => redirect('/Calendar')} 
                    className={classes.MobileLink}
                >Calendar</div>
                
                <div 
                    onClick={() => redirect('/Overview')} 
                    className={classes.MobileLink}
                >Overview</div>
                
                <div 
                    onClick={logout} 
                    className={classes.MobileLink}
                >Logout</div>
            </span>
        );
    } else {
        mobileButtons = (
            <span>
                <div 
                    onClick={() => redirect('/Login')} 
                    className={classes.MobileLink}
                >Login</div>
                
                <div 
                    onClick={() => redirect('/Register')} 
                    className={classes.MobileLink}
                >Register</div>
            </span>
        );
    }

    let buttons = null;
    if (props.isAuthenticated) {
        buttons = (
            <span>
                <button
                    onClick={logout}
                    className={classes.NavigationButton}
                >Logout</button>

                <button
                    onClick={() => redirect('/Overview')}
                    className={classes.NavigationButton}
                >Overview</button>

                <button
                    onClick={() => redirect('/Calendar')}
                    className={classes.NavigationButton}
                >Calendar</button>
            </span>
        );
    } else {
        buttons = (
            <span>
                <button
                    onClick={() => redirect('/Register')}
                    className={classes.NavigationButton}
                >Register</button>

                <button
                    onClick={() => redirect('/Login')}
                    className={classes.NavigationButton}
                >Login</button>
            </span>
        );
    }

    const mobileButtonsStyle = {
        display: showBurger ? 'block' : 'none'
    };

    return (
        <nav className={classes.Navigation}>
            <span
                to='/'
                onClick={() => redirect('/')}
                className={classes.Logo}
            >Reactive Calendar</span>

            {buttons}
            <div onClick={toggleMobileButtons} className={classes.Burger}>
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

export default withRouter(Navigation);