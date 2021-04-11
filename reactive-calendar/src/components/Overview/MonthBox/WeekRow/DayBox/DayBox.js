import React, { Component } from 'react';
import classes from './DayBox.module.css';

import calendarService from '../../../../../services/calendarService.js';

class DayBox extends Component {
    state = {
        showPopup: false
    }

    hoverHandler = () => {
        this.setState({ showPopup: true });
    }

    hoverLeaveHandler = () => {
        this.setState({ showPopup: false });
    }

    redirect = () => {
        const date = this.props.date;
        this.props.redirect(this.props.history, `/Todo/${date}`);
    }

    render() {
        const moodColor = this.props.moodColor;
        let popup = null;
        if (this.state.showPopup) {
            const stringDate = calendarService.convertFromNumber(this.props.date);

            popup = (
                <div className={classes.Popover}>{stringDate}</div>
            );
        }

        return (
            <div
                onMouseOver={this.hoverHandler}
                onMouseLeave={this.hoverLeaveHandler}
                onClick={this.redirect}
                style={{ backgroundColor: moodColor }}
                className={classes.DayBox}>
                {popup}
            </div>

        );
    }
}

export default DayBox;