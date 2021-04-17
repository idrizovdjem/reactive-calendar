import classes from './TodoContainer.module.css';

import calendarService from '../../services/calendarService.js';

import TodoSection from './TodoSection/TodoSection';
import MoodSelect from './MoodSelect/MoodSelect';

const TodoContainer = (props) => {
    const date = props.match.params.date;
    let stringDate = calendarService.convertFromNumber(date);

    return (
        <div className={classes.TodoContainer}>
            <span className={classes.CurrentDate}>Current date: {stringDate}</span>
            <MoodSelect date={date} />
            <TodoSection date={date} />
        </div>
    );
}

export default TodoContainer;