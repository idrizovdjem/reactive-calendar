import React, { Component } from 'react';
import classes from './MonthBox.module.css';

import calendarService from '../../../services/calendarService.js';
import moodService from '../../../services/moodService.js';

import WeekRow from './WeekRow/WeekRow';
import Spinner from '../../Spinner/Spinner';

class MonthBox extends Component {
    state = {
        isLoading: false,
        errorMessages: [],
        dateMoods: [],
        monthDays: []
    }

    async componentDidMount() {
        this.setState({ isLoading: true });

        const { year, month } = this.props;
        const { from, to } = calendarService.getMonthRange(year, month);
        const monthDays = calendarService.getCalendarDays(year, month);
        const transformedMonthDays = monthDays.map(day => day.date);
        this.setState({ monthDays: [...transformedMonthDays] });

        const rawMoodResponse = await moodService.getForRange(from, to);
        const moodResponse = rawMoodResponse.data.response;

        if (!moodResponse.successfull) {
            this.setState({
                isLoading: false,
                errorMessages: [...moodResponse.errorMessages]
            });
        } else {
            this.setState({
                isLoading: false,
                dateMoods: [...moodResponse.data.dateMoods]
            });
        }
    }

    render() {
        const spinner = this.state.isLoading ? <Spinner /> : null;
        const weekRows = [];

        if (this.state.monthDays.length > 0) {
            let counter = 0;
            for (let week = 0; week < 6; week++) {
                const dayMoods = [];

                for (let day = 0; day < 7; day++) {
                    const currentDate = this.state.monthDays[counter++];
                    const dateMood = {
                        date: currentDate
                    };
                    
                    const currentMood = this.state.dateMoods.find(dateMood => dateMood.date === currentDate);
                    if(!currentMood) {
                        dateMood.mood = 'Missing';
                    } else {
                        dateMood.mood = currentMood.mood;
                    }

                    dayMoods.push(dateMood);
                }

                weekRows.push(<WeekRow dayMoods={dayMoods} key={week}/>);
            }
        }

        return (
            <div className={classes.MonthBox}>
                {spinner}
                {weekRows}
            </div>
        );
    }
}

export default MonthBox;