import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import classes from './Navigation.module.css';

import authService from '../../services/authService.js';

import BurgerButtons from './BurgerButtons/BurgerButtons';
import NavigationButtons from './NavigationButtons/NavigationButtons';

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

    const toggleBurgerButtons = () => {
        setShowBurger(oldState => !oldState);
    }

    return (
        <nav className={classes.Navigation}>
            <span
                to='/'
                onClick={() => redirect('/')}
                className={classes.Logo}
            >Reactive Calendar</span>

            <NavigationButtons 
                isAuthenticated={props.isAuthenticated}
                logout={logout}
                redirect={redirect}
            />
            
            <div onClick={toggleBurgerButtons} className={classes.Burger}>
                <div className={classes.Slice}></div>
                <div className={classes.Slice}></div>
                <div className={classes.Slice}></div>
            </div>

            <BurgerButtons 
                isAuthenticated={props.isAuthenticated}
                logout={logout}
                redirect={redirect}
                showBurger={showBurger}
            />
        </nav>
    );
}

export default withRouter(Navigation);