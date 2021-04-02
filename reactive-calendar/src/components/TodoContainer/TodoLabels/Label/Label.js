import React, { Component } from 'react';
import classes from './Label.module.css';

class Label extends Component {
    render() {
        const style = {
            backgroundColor: this.props.backgroundColor,
            color: this.props.color
        };

        return (
            <div className={classes.Label}>
                <p style={style} className={classes.LabelText}>{this.props.text}</p>
            </div>
        );
    }
}

export default Label;