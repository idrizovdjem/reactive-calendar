import React, { Component } from 'react';
import classes from './CalendarBox.module.css';

import CalendarTodo from './CalendarTodo/CalendarTodo'

class CalendarBox extends Component {

    render() {
        return (
            <td className={classes.Box}>
                <span className={classes.FirstRow}>
                    <div className={classes.LeftBox}>
                        <div className={classes.ColorBox}>
                        </div>
                    </div>
                    <div className={classes.RightBox}>
                        <span className={classes.Number}>31</span>
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