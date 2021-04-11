import React, { Component } from 'react';
import classes from './MonthRow.module.css';

import MonthBox from '../MonthBox/MonthBox';

class MonthRow extends Component {

    render() {
        const monthBoxes = [];
        for(let i = this.props.from; i <= this.props.to; i++) {
            monthBoxes.push(<MonthBox year={this.props.year} key={i} month={i} />)
        }

        return (
            <div className={classes.MonthRow}>
                {monthBoxes}
            </div>
        );
    }
}

export default MonthRow;