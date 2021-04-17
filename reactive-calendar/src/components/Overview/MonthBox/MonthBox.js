import React, { Component } from 'react';
import classes from './MonthBox.module.css';

import calendarService from '../../../services/calendarService.js';
import moodService from '../../../services/moodService.js';

import WeekRow from './WeekRow/WeekRow';
import Spinner from '../../Shared/Spinner/Spinner';

class MonthBox extends Component {
    state = {
        isLoading: false,
        errorMessages: [],
        monthDays: []
    }

    async componentDidMount() {
        this.setState({ isLoading: true });

        const { year, month } = this.props;
        const { from, to } = calendarService.getMonthData(year, month);

        const rawMoodResponse = await moodService.getForRange(from, to);
        const moodResponse = rawMoodResponse.data.response;
        const dateMoods = moodResponse.data.dateMoods;

        const monthDays = [];
        for (let i = from - 1; i <= to; i++) {
            const currentDateMood = dateMoods.find(dateMood => dateMood.date === i);
            let mood = 'Missing';
            if (currentDateMood !== undefined) {
                mood = currentDateMood.mood;
            }

            monthDays.push({
                date: i,
                mood
            });
        }

        if (!moodResponse.successfull) {
            this.setState({
                isLoading: false,
                errorMessages: [...moodResponse.errorMessages]
            });
        } else {
            this.setState({
                isLoading: false,
                monthDays: [...monthDays]
            });
        }
    }

    render() {
        const spinner = this.state.isLoading ? <Spinner /> : null;
        const weekRows = [];

        if (this.state.monthDays.length > 0) {
            let counter = 0;

            for (let week = 0; week < 5; week++) {
                const dayMoods = [];
                for (let day = 0; day < 7; day++) {
                    counter++;
                    if (counter === this.state.monthDays.length) {
                        break;
                    }

                    const { date, mood } = this.state.monthDays[counter];
                    const dateMood = {
                        date,
                        mood
                    };

                    dayMoods.push(dateMood);
                }

                weekRows.push(<WeekRow {...this.props} dayMoods={dayMoods} key={week} />);
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