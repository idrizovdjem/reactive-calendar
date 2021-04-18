import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classes from './CalendarBox.module.css';

import moodService from '../../../../services/moodService.js';

import CalendarTodo from './CalendarTodo/CalendarTodo';
import TodoPopover from './TodoPopover/TodoPopover';

const CalendarBox = (props) => {
    const [showPopover, setShowPopover] = useState(false);
    const [moodColor, setMoodColor] = useState(null);

    useEffect(() => {
        const moodColor = props.dateObject.moodColor || '#ebedf0';
        setMoodColor(moodColor);
    }, [props]);


    const redirect = () => {
        const date = props.dateObject.date;
        props.redirect(props.history, `/Todo/${date}`);
    }

    const showPopoverHandler = () => {
        setShowPopover(true);
    }

    const hidePopoverHandler = () => {
        setShowPopover(false);
    }

    const updateMoodHanlder = async (event, mood) => {
        event.stopPropagation();
        const newMoodColor = moodService.getMoodColor(mood);
        setMoodColor(newMoodColor);
        const date = props.dateObject.date;
        moodService.updateMood(date, mood);
    }

    const todos = props.dateObject.todos.map((todo, index) => {
        return (
            <CalendarTodo
                backgroundColor={todo.label.backgroundColor}
                key={index}
            />
        );
    });

    const date = props.dateObject;
    let boxClass = date.currentMonth ? classes.Current : classes.Box;
    let numberClass = date.isActive ? classes.Active : classes.Number;

    let popover = null;
    if (showPopover) {
        popover = (
            <TodoPopover
                updateMoodHanlder={updateMoodHanlder}
            />
        );
    }

    return (
        <div className={boxClass} onClick={redirect}>
            <span className={classes.FirstRow}>
                <div className={classes.LeftBox}>
                    <div 
                        onMouseLeave={hidePopoverHandler} 
                        onMouseOver={showPopoverHandler} 
                        style={{ backgroundColor: moodColor }} 
                        className={classes.ColorBox}
                    >
                        {popover}
                    </div>
                </div>
                <div className={classes.RightBox}>
                    <p className={numberClass}>{date.day}</p>
                </div>
            </span>
            <span className={classes.SecondRow}>
                {todos}
            </span>
        </div>
    );
}

export default withRouter(CalendarBox);