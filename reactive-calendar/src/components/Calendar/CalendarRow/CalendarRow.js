import classes from './CalendarRow.module.css';

import CalendarBox from './CalendarBox/CalendarBox';

const CalendarRow = (props) => {
    const boxArray = [];
    if (props.days.length > 0) {
        for (let i = 0; i < props.days.length; i++) {
            const date = props.days[i];
            boxArray.push(
                <CalendarBox 
                    redirect={props.redirect} 
                    key={i} 
                    dateObject={date} 
                />
            );
        }
    }

    return (
        <div className={classes.Row}>
            {boxArray}
        </div>
    );
}

export default CalendarRow;