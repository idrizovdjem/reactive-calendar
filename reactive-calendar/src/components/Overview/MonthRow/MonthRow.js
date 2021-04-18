import classes from './MonthRow.module.css';

import MonthBox from '../MonthBox/MonthBox';

const MonthRow = (props) => {
    const monthBoxes = [];
    for (let i = props.from; i <= props.to; i++) {
        monthBoxes.push(
            <MonthBox 
                {...props} 
                year={props.year} 
                key={i} 
                month={i}
            />
        );
    }

    return (
        <div className={classes.MonthRow}>
            {monthBoxes}
        </div>
    );
}

export default MonthRow;