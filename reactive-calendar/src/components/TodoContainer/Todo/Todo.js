import React, { Component } from 'react';
import classes from './Todo.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import todoService from '../../../services/todoService.js';

class Todo extends Component {
    state = {
        isChecked: this.props.isChecked
    }

    changeCheckedHandler = async () => {
        const newCheckState = !this.state.isChecked;
        const id = this.props.id;
        this.setState({ isChecked: newCheckState });
        await todoService.changeTodoCheckedState(id, newCheckState);
    }

    render() {
        const nextIcon = this.state.isChecked ? faCheckSquare : faSquare;

        return (
            <div style={this.props.label} className={classes.Todo}>
                <div style={{ color: this.props.label.color }} className={classes.TodoText}>
                    {this.props.title}
                </div>
                <FontAwesomeIcon onClick={this.changeCheckedHandler} icon={nextIcon} className={classes.Icon} />
            </div>
        );
    }
}

export default Todo;