import React, { Component } from 'react';
import classes from './DayBox.module.css';

class DayBox extends Component {

    render() {
        const moodColor = this.props.moodColor;

        return (
            <div style={{backgroundColor: moodColor}} className={classes.DayBox}>

            </div>
        );
    }
}

export default DayBox;