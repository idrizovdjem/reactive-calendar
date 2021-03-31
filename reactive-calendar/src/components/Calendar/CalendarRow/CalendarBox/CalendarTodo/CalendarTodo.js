import React, { Component } from 'react';
import classes from './CalendarTodo.module.css';

class CalendarTodo extends Component {
    render() {
        return (
            <div className={classes.TodoRow}>
                <div className={classes.TodoText}>{this.props.text}</div>
            </div>
        );
    }
}

export default CalendarTodo;