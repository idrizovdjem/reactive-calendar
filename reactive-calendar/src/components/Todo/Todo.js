import React, { Component } from 'react';
import classes from './Todo.module.css';

class Todo extends Component {

    changeCheckbox = (event) => {
        const notChecked = '☐';
        const checked = '☑';

        if (event.target.textContent === notChecked) {
            event.target.textContent = checked;
        } else {
            event.target.textContent = notChecked;
        }
    }

    // TODO: add todo label

    render() {
        return (
            <div className={classes.TodoContainer}>
                <span className={classes.CurrentDate}>Current date: 2021/03/31</span>

                <div className={classes.TodoSection}>
                    <span className={classes.TodoSectionText}>Todo section:</span>

                    <div className={classes.Todo}>
                        <p className={classes.TodoText}>Implement login</p>

                        <div onClick={this.changeCheckbox} className={classes.CheckBox}>☐</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Todo;