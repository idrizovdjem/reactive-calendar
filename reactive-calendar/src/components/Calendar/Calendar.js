import React, { Component } from 'react';
import classes from './Calendar.module.css';
import calendarService from '../../services/calendarService.js';

import CalendarRow from './CalendarRow/CalendarRow';

class Calendar extends Component {
    state = {
        days: [],
        date: {}
    };

    componentDidMount() {
        this.updateDate();
    }

    updateDate = () => {
        const currentDate = calendarService.getCurrentDate();
        const { year, month } = currentDate;
        const currentDays = calendarService.getCalendarDays(year, month);

        this.setState({
            days: [...currentDays],
            date: currentDate
        });
    }

    render() {
        const calendarRows = [];
        if (this.state.days.length !== 0) {
            let next = 0;
            for (let i = 0; i < 5; i++) {
                const currentRowDays = [];
                for (let j = 0; j < 7; j++) {
                    currentRowDays.push(this.state.days[next++]);
                }

                calendarRows.push(<CalendarRow key={i} days={currentRowDays} />);
            }
        }

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
                    {calendarRows}
                </tbody>
            </table>
        );
    }
}

export default Calendar;