import React, { Component } from 'react';
import classes from './CalendarTodo.module.css';

class CalendarTodo extends Component {
    render() {
        const style = {
            backgroundColor: this.props.backgroundColor
        };

        return (
            <div style={style} className={classes.TodoRow}></div>
        );
    }
}

export default CalendarTodo;