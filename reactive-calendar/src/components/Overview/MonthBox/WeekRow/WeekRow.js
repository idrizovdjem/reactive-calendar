import React, { Component } from 'react';
import classes from './WeekRow.module.css';

import DayBox from './DayBox/DayBox';

class WeekRow extends Component {

    getMoodColor = (mood) => {
        switch(mood) {
            case 'Excellent': return '#008000';
            case 'Good': return '#38b000';
            case 'Average': return '#ccff33';
            case 'Bad': return '#f79d65';
            case 'Miserable': return '#f27059';
            default: return '#ebedf0';
        }
    }

    render() {
        const dayBoxes = [];
        this.props.dayMoods.forEach(dayMood => {
            const currentMood = this.getMoodColor(dayMood.mood);
            dayBoxes.push(<DayBox key={dayMood.date} moodColor={currentMood} />);
        });

        return (
            <div className={classes.WeekRow}>
                {dayBoxes}
            </div>
        );
    }
}

export default WeekRow;