import React, { Component } from 'react';
import classes from './SideBar.module.css';

import DateChanger from '../../DateChanger/DateChanger';

class SideBar extends Component {
    state = {
        year: this.props.date.year,
        month: this.props.date.month
    }

    updateYear = (value) => {
        const year = this.state.year + value;
        this.setState({ year });

        this.props.updateDate(year, this.state.month);
    }

    updateMonth = (value) => {
        let month = this.state.month + value;
        let year = this.state.year;

        if(month === 0) {
            month = 12;
            year--;
        } else if(month === 13) {
            month = 1;
            year++;
        }

        this.setState({ year, month });
        this.props.updateDate(year, month);
    }

    render() {
        return (
            <div className={classes.SideBar}>
                <DateChanger dateLabel='Year' dateValue={this.state.year} updateDate={this.updateYear} />
                <DateChanger dateLabel='Month' dateValue={this.state.month} updateDate={this.updateMonth} />
            </div>
        );
    }
}

export default SideBar;