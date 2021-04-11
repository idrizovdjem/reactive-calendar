import React, { Component } from 'react';
import classes from './WeekRow.module.css';

import DayBox from './DayBox/DayBox';

class WeekRow extends Component {

    render() {
        return (
            <div className={classes.WeekRow}>
                <DayBox />
                <DayBox />
                <DayBox />
                <DayBox />
                <DayBox />
                <DayBox />
                <DayBox />
            </div>
        );
    }
}

export default WeekRow;