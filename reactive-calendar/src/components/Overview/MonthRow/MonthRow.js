import React, { Component } from 'react';
import classes from './MonthRow.module.css';

import MonthBox from '../MonthBox/MonthBox';

class MonthRow extends Component {

    render() {
        return (
            <div className={classes.MonthRow}>
                <MonthBox />
                <MonthBox />
                <MonthBox />
                <MonthBox />
            </div>
        );
    }
}

export default MonthRow;