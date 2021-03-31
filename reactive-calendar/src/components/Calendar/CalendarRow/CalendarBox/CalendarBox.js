import React, { Component } from 'react';
import classes from './CalendarBox.module.css';

import CalendarTodo from './CalendarTodo/CalendarTodo'

class CalendarBox extends Component {

    render() {
        const date = this.props.date;
        let boxClass = date.currentMonth ? classes.Current : classes.Box;
        let numberClass = date.isActive ? classes.Active : classes.Number;

        return (
            <td className={boxClass}>
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
                    <CalendarTodo text={'Implem...'}/>
                    <CalendarTodo text={'Implem...'}/>
                </span>
            </td>
        );
    }
}

export default CalendarBox;