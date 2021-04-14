import React, { Component } from 'react';
import classes from './CalendarHeaderRow.module.css';

class CalendarHeaderRow extends Component {

    render() {
        return(
            <div className={classes.CalendarHeaderRow}>
                <div className={`${classes.HeaderBox} ${classes.Mon}`}></div>
                <div className={`${classes.HeaderBox} ${classes.Tue}`}></div>
                <div className={`${classes.HeaderBox} ${classes.Wed}`}></div>
                <div className={`${classes.HeaderBox} ${classes.Thu}`}></div>
                <div className={`${classes.HeaderBox} ${classes.Fri}`}></div>
                <div className={`${classes.HeaderBox} ${classes.Sat}`}></div>
                <div className={`${classes.HeaderBox} ${classes.Sun}`}></div>
            </div>
        );
    }
}

export default CalendarHeaderRow;