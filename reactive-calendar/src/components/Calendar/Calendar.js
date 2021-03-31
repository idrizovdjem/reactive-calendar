import React, { Component } from 'react';
import classes from './Calendar.module.css';

import CalendarRow from './CalendarRow/CalendarRow.js';

class Calendar extends Component {
    render() {
        return (
            <table className={classes.Calendar}>
                <thead>
                    <tr>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                        <th>Sun</th>
                    </tr>
                </thead>
                <tbody>
                    <CalendarRow />
                    <CalendarRow />
                    <CalendarRow />
                    <CalendarRow />
                    <CalendarRow />
                </tbody>
            </table>
        );
    }
}

export default Calendar;