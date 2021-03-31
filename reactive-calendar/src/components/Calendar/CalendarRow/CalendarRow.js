import React, { Component } from 'react';
import classes from './CalendarRow.module.css';

import CalendarBox from './CalendarBox/CalendarBox.js';

class CalendarRow extends Component {
    render() {
        return (
            <tr className={classes.Row}>
                <CalendarBox />
                <CalendarBox />
                <CalendarBox />
                <CalendarBox />
                <CalendarBox />
                <CalendarBox />
                <CalendarBox />
            </tr>
        );
    }
}

export default CalendarRow;