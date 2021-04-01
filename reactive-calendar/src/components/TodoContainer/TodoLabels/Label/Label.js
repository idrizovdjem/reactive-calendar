import React, { Component } from 'react';
import classes from './Label.module.css';

class Label extends Component {

    render() {
        return (
            <div className={classes.Label}>
                <p className={classes.LabelText}>Important</p>
            </div>
        );
    }
}

export default Label;