import React, { Component } from 'react';
import classes from './MonthBox.module.css';

import WeekRow from './WeekRow/WeekRow';

class MonthBox extends Component {

    render() {
        return (
            <div className={classes.MonthBox}>
                <WeekRow />
                <WeekRow />
                <WeekRow />
                <WeekRow />
                <WeekRow />
                <WeekRow />
            </div>
        );
    }
}

export default MonthBox;