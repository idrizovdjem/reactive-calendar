import React, { Component } from 'react';
import classes from './CalendarBox.module.css';

import CalendarTodo from './CalendarTodo/CalendarTodo'

class CalendarBox extends Component {
    redirect = () => {
        const date = this.props.dateObject.date;
        this.props.redirect(`/Todo/${date}`);
    }

    render() {
        // display todos for the day

        const todos = [];
        if(this.props.dateObject.todos.length > 0) {
            this.props.dateObject.todos.forEach((todo, index) => {
                todos.push(<CalendarTodo backgroundColor={todo.label.backgroundColor} key={index} />)
            });
        }

        const date = this.props.dateObject;
        let boxClass = date.currentMonth ? classes.Current : classes.Box;
        let numberClass = date.isActive ? classes.Active : classes.Number;

        return (
            <td className={boxClass} onClick={this.redirect}>
                <span className={classes.FirstRow}>
                    <div className={classes.LeftBox}>
                        <div className={classes.ColorBox}>
                        </div>
                    </div>
                    <div className={classes.RightBox}>
                        <span className={numberClass}>{date.day}</span>
                    </div>
                </span>
                <span className={classes.SecondRow}>
                    {todos}
                </span>
            </td>
        );
    }
}

export default CalendarBox;