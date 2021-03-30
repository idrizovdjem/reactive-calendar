import React from 'react';
import classes from './Navigation.module.css';

const Navigation = (props) => {
    let buttons = null;

    const changePage = (event) => {
        const page = event.target.textContent;
        props.redirect(page);
    }

    if(props.isUserAuthenticated) {
        buttons = (
            <span>
                <button className={classes.NavigationButton}>Logout</button>
                <button onClick={changePage} className={classes.NavigationButton}>Overview</button>
                <button onClick={changePage} className={classes.NavigationButton}>Calendar</button>
            </span>
        );
    } else {
        buttons = (
            <span>
                <button onClick={changePage} className={classes.NavigationButton}>Register</button>
                <button onClick={changePage} className={classes.NavigationButton}>Login</button>
            </span>
        );
    }

    return (
        <nav className={classes.Navigation}>
            <span className={classes.Logo}>Reactive Calendar</span>
            {buttons}
        </nav>
    );
}

export default Navigation;