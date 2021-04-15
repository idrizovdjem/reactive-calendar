import React, { Component } from 'react';
import classes from './TodoContainer.module.css';

import calendarService from '../../services/calendarService.js';

import Spinner from '../Spinner/Spinner';
import TodoSection from './TodoSection/TodoSection';
import MoodSelect from './MoodSelect/MoodSelect';

class TodoContainer extends Component {
    state = {
        currentDate: this.props.match.params.date
    }

    render() {
        if (this.state.isLoading) {
            return <Spinner />
        }

        let stringDate = calendarService.convertFromNumber(this.state.currentDate);
        return (
            <div className={classes.TodoContainer}>
                <span className={classes.CurrentDate}>Current date: {stringDate}</span>
                <MoodSelect currentDate={this.state.currentDate} />
                <TodoSection date={this.state.currentDate} />
            </div>
        );
    }
}

export default TodoContainer;