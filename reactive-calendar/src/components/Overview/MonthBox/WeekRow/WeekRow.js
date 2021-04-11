import React, { Component } from 'react';
import classes from './WeekRow.module.css';

import moodService from '../../../../services/moodService.js';

import DayBox from './DayBox/DayBox';

class WeekRow extends Component {
    render() {
        const dayBoxes = [];
        this.props.dayMoods.forEach(dayMood => {
            const currentMood = moodService.getMoodColor(dayMood.mood);
            dayBoxes.push(<DayBox {...this.props} key={dayMood.date} date={dayMood.date} moodColor={currentMood} />);
        });

        return (
            <div className={classes.WeekRow}>
                {dayBoxes}
            </div>
        );
    }
}

export default WeekRow;