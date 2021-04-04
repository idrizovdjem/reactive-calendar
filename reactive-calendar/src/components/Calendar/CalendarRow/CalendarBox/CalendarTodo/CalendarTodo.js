import React, { Component } from 'react';
import classes from './CalendarTodo.module.css';

class CalendarTodo extends Component {
    render() {
        const label = this.props.label;
        
        const style = {
            backgroundColor: label.backgroundColor,
            color: label.color
        };

        return (
            <div style={style} className={classes.TodoRow}>
                <div className={classes.TodoText}>{this.props.title}</div>
            </div>
        );
    }
}

export default CalendarTodo;