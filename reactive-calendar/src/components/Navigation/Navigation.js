import React from 'react';
import classes from './Navigation.module.css';

const Navigation = (props) => {

    return (
        <nav className={classes.Navigation}>
            <h3 className={classes.Logo}>Reactive Calendar</h3>
        </nav>
    );
}

export default Navigation;