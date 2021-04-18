import { useState } from 'react';
import classes from './DayBox.module.css';

import calendarService from '../../../../../services/calendarService.js';

const DayBox = (props) => {
    const [showPopup, setShowPopup] = useState(false);

    const hoverHandler = () => {
        setShowPopup(true);
    }

    const hoverLeaveHandler = () => {
        setShowPopup(false);
    }

    const redirect = () => {
        const date = props.date;
        props.redirect(props.history, `/Todo/${date}`);
    }

    let popup = null;
    if (showPopup) {
        const stringDate = calendarService.convertFromNumber(props.date);
        popup = (
            <div className={classes.Popover}>{stringDate}</div>
        );
    }

    return (
        <div
            onMouseOver={hoverHandler}
            onMouseLeave={hoverLeaveHandler}
            onClick={redirect}
            style={{ backgroundColor: props.moodColor }}
            className={classes.DayBox}>
            {popup}
        </div>
    );
}

export default DayBox;