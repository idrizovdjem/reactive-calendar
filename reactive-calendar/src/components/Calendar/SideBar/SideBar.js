import { useState } from 'react';
import classes from './SideBar.module.css';

import DateChanger from '../../DateChanger/DateChanger';

const SideBar = (props) => {
    const [year, setYear] = useState(props.date.year);
    const [month, setMonth] = useState(props.date.month);

    const updateYear = (value) => {
        const newYear = year + value;
        setYear(newYear);
        props.updateDate(newYear, month);
    }

    const updateMonth = (value) => {
        let newMonth = month + value;
        let newYear = year;

        if (month === 0) {
            newMonth = 12;
            newYear--;
        } else if (month === 13) {
            newMonth = 1;
            newYear++;
        }

        setMonth(newMonth);
        setYear(newYear);
        props.updateDate(newYear, newMonth);
    }

    return (
        <div className={classes.SideBar}>
            <DateChanger 
                dateLabel='Year' 
                dateValue={year} 
                updateDate={updateYear} 
            />

            <DateChanger 
                dateLabel='Month' 
                dateValue={month} 
                updateDate={updateMonth} 
            />
        </div>
    );
}

export default SideBar;