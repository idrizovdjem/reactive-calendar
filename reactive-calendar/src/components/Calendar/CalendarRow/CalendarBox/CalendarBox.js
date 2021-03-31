import React, { Component } from 'react';
import classes from './CalendarBox.module.css';

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

                </span>
            </td>
        );
    }
}

export default CalendarBox;