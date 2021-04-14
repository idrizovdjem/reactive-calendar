import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classes from './CalendarBox.module.css';

import moodService from '../../../../services/moodService.js';

import CalendarTodo from './CalendarTodo/CalendarTodo';

class CalendarBox extends Component {
    state = {
        showPopover: false,
        moodColor: null
    }

    componentDidMount() {
        const moodColor = this.props.dateObject.moodColor || '#ebedf0';
        this.setState({ moodColor: moodColor });
    }

    redirect = () => {
        const date = this.props.dateObject.date;
        this.props.redirect(this.props.history, `/Todo/${date}`);
    }

    showPopoverHandler = () => {
        this.setState({ showPopover: true });
    }

    hidePopoverHandler = () => {
        this.setState({ showPopover: false });
    }

    updateMoodHanlder = async (event, mood) => {
        event.stopPropagation();
        const newMoodColor = moodService.getMoodColor(mood);
        this.setState({ moodColor: newMoodColor });
        const date = this.props.dateObject.date;
        moodService.updateMood(date, mood);
    }

    render() {
        const todos = [];
        if (this.props.dateObject.todos.length > 0) {
            this.props.dateObject.todos.forEach((todo, index) => {
                todos.push(<CalendarTodo backgroundColor={todo.label.backgroundColor} key={index} />)
            });
        }

        const date = this.props.dateObject;
        let boxClass = date.currentMonth ? classes.Current : classes.Box;
        let numberClass = date.isActive ? classes.Active : classes.Number;

        let popover = null;
        if (this.state.showPopover) {
            popover = (
                <div className={classes.Popover}>
                    <div onClick={(event) => this.updateMoodHanlder(event, 'Miserable')} className={`${classes.PopoverBox} ${classes.Miserable}`}></div>
                    <div onClick={(event) => this.updateMoodHanlder(event, 'Bad')} className={`${classes.PopoverBox} ${classes.Bad}`}></div>
                    <div onClick={(event) => this.updateMoodHanlder(event, 'Average')} className={`${classes.PopoverBox} ${classes.Average}`}></div>
                    <div onClick={(event) => this.updateMoodHanlder(event, 'Good')} className={`${classes.PopoverBox} ${classes.Good}`}></div>
                    <div onClick={(event) => this.updateMoodHanlder(event, 'Excellent')} className={`${classes.PopoverBox} ${classes.Excellent}`}></div>
                </div>
            );
        }

        return (
            <div className={boxClass} onClick={this.redirect}>
                <span className={classes.FirstRow}>
                    <div className={classes.LeftBox}>
                        <div onMouseLeave={this.hidePopoverHandler} onMouseOver={this.showPopoverHandler} style={{ backgroundColor: this.state.moodColor }} className={classes.ColorBox}>
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
}

export default withRouter(CalendarBox);