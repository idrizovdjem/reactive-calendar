import classes from './WeekRow.module.css';

import moodService from '../../../../services/moodService.js';

import DayBox from './DayBox/DayBox';

const WeekRow = (props) => {
    const dayBoxes = props.dayMoods.map(dayMood => {
        const currentMood = moodService.getMoodColor(dayMood.mood);
        
        return (
            <DayBox 
                {...props} 
                key={dayMood.date} 
                date={dayMood.date} 
                moodColor={currentMood} 
            />
        );
    });

    return (
        <div className={classes.WeekRow}>
            {dayBoxes}
        </div>
    );
}

export default WeekRow;