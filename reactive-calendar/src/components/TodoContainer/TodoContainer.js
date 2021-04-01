import React, { Component } from 'react';
import classes from './TodoContainer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import Todo from './Todo/Todo';

class TodoContainer extends Component {
    // TODO: add todo label

    render() {
        return (
            <div className={classes.TodoContainer}>
                <span className={classes.CurrentDate}>Current date: 2021/03/31</span>

                <div className={classes.TodoSection}>
                    <span className={classes.TodoSectionText}>Todo section:</span>
                    <Todo />
                    <Todo />
                    <FontAwesomeIcon icon={faPlusCircle} className={classes.Add}/>
                </div>
            </div>
        );
    }
}

export default TodoContainer;