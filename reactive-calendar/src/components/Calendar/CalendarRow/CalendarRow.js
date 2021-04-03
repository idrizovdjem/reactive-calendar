import React, { Component } from 'react';
import classes from './CalendarRow.module.css';

import CalendarBox from './CalendarBox/CalendarBox';

class CalendarRow extends Component {
    render() {
        const boxArray = [];
        if(this.props.days.length > 0) {
            for(let i = 0; i < this.props.days.length; i++) {
                const date = this.props.days[i];
                boxArray.push(<CalendarBox redirect={this.props.redirect} key={i} dateObject={date} />);
            }
        }

        return (
            <tr className={classes.Row}>
                {boxArray}
            </tr>
        );
    }
}

export default CalendarRow;