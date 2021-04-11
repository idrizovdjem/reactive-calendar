import React, { Component } from 'react';
import classes from './DayBox.module.css';

class DayBox extends Component {
    redirect = () => {
        const date = this.props.date;
        this.props.redirect(this.props.history, `/Todo/${date}`);
    }

    render() {
        const moodColor = this.props.moodColor;
        return (
            <div onClick={this.redirect} style={{ backgroundColor: moodColor }} className={classes.DayBox}>
            </div>
        );
    }
}

export default DayBox;