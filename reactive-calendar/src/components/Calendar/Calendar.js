import React, { Component } from 'react';
import classes from './Calendar.module.css';
import calendarService from '../../services/calendarService.js';

import CalendarRow from './CalendarRow/CalendarRow';

class Calendar extends Component {
    render() {
        const days = calendarService.getCalendarDays();

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