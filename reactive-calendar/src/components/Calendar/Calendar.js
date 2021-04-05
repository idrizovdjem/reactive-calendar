import React, { Component } from 'react';
import classes from './Calendar.module.css';
import calendarService from '../../services/calendarService.js';
import todoService from '../../services/todoService.js';

import CalendarRow from './CalendarRow/CalendarRow';
import Spinner from '../Spinner/Spinner';
import Alert from '../Alert/Alert';

class Calendar extends Component {
    state = {
        isLoading: false,
        errorMessages: [],
        days: [],
        date: {}
    };

    async componentDidMount() {
        await this.updateDate();
    }

    updateDate = async () => {
        // * get current date
        // * get days for the calendar
        // * get todos for the days

        this.setState({ isLoading: true });

        const currentDate = calendarService.getCurrentDate();
        const { year, month } = currentDate;
        const currentDays = calendarService.getCalendarDays(year, month);

        const startDate = currentDays[0].date;
        const endDate = currentDays[currentDays.length - 1].date;

        const todosResponse = await todoService.getTodosForDates(startDate, endDate);
        if(!todosResponse.successfull) {
            this.setState({
                isLoading: false,
                errorMessages: [...todosResponse.errorMessages]
            });
            return;
        }

        const dateTodos = todosResponse.data.todos;
        dateTodos.forEach(todo => {
            const day = currentDays.find(day => day.date === todo.date);
            if(day.todos.length < 1) {
                day.todos.push(todo);
            }
        }); 

        this.setState({
            isLoading: false,
            days: [...currentDays],
            date: currentDate
        });
    }

    render() {
        if(this.state.errorMessages.length > 0) {
            const alerts = this.state.errorMessages.map((message, index) => {
                return <Alert alert='danger' message={message} key={index} />
            });

            return alerts;
        }

        if(this.state.isLoading) {
            return <Spinner />
        }

        // display days
        const calendarRows = [];
        if (this.state.days.length !== 0) {
            let next = 0;
            for (let i = 0; i < 6; i++) {
                const currentRowDays = [];
                for (let j = 0; j < 7; j++) {
                    currentRowDays.push(this.state.days[next++]);
                }

                calendarRows.push(<CalendarRow redirect={this.props.redirect} key={i} days={currentRowDays} />);
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