import { useState, useEffect } from 'react';
import classes from './MonthBox.module.css';

import calendarService from '../../../services/calendarService.js';
import moodService from '../../../services/moodService.js';

import WeekRow from './WeekRow/WeekRow';
import Spinner from '../../Shared/Spinner/Spinner';
import Alert from '../../Shared/Alert/Alert';

const MonthBox = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const [monthDays, setMonthDays] = useState([]);

    useEffect(() => {
        async function fetchMonthDays() {
            setIsLoading(true);

            const { year, month } = props;
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
                setErrorMessages(moodResponse.errorMessages);
            } else {
                setMonthDays(monthDays);
            }

            setIsLoading(false);
        }

        fetchMonthDays();
    }, [props]);

    if(errorMessages.length > 0) {
        return errorMessages.map((message, index) => {
            return <Alert alert='danger' key={index} message={message} />;
        });
    }

    const spinner = isLoading ? <Spinner /> : null;
    const weekRows = [];

    if (monthDays.length > 0) {
        let counter = 0;

        for (let week = 0; week < 5; week++) {
            const dayMoods = [];
            for (let day = 0; day < 7; day++) {
                counter++;
                if (counter === monthDays.length) {
                    break;
                }

                const { date, mood } = monthDays[counter];
                const dateMood = {
                    date,
                    mood
                };

                dayMoods.push(dateMood);
            }

            weekRows.push(
                <WeekRow 
                    {...props} 
                    dayMoods={dayMoods} 
                    key={week} 
                />
            );
        }
    }

    return (
        <div className={classes.MonthBox}>
            {spinner}
            {weekRows}
        </div>
    );
}

export default MonthBox;