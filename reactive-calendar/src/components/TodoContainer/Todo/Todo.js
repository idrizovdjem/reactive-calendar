import React, { Component } from 'react';
import classes from './Todo.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare, faTimes } from '@fortawesome/free-solid-svg-icons';
import todoService from '../../../services/todoService.js';

class Todo extends Component {
    state = {
        isChecked: this.props.todo.isChecked,
        showDescription: false
    }

    changeCheckedHandler = async (event) => {
        event.stopPropagation();
        const newCheckState = !this.state.isChecked;
        const id = this.props.todo.id;
        this.setState({ isChecked: newCheckState });
        await todoService.changeTodoCheckedState(id, newCheckState);
    }

    toggleDescriptionHandler = () => {
        this.setState({ showDescription: !this.state.showDescription });
    }

    deleteTodoHandler = (event) => {
        event.stopPropagation();
        this.props.onDelete(this.props.todo.id);
    }

    render() {
        const nextCheckIcon = this.state.isChecked ? faCheckSquare : faSquare;

        let descriptionElement = null;
        if (this.state.showDescription) {
            descriptionElement = (
                <div className={classes.TodoDescription}>
                    {this.props.todo.description}
                </div>
            );
        }

        return (
            <div>
                <div onClick={this.toggleDescriptionHandler} style={this.props.todo.label} className={classes.Todo}>
                    <div style={{ color: this.props.todo.label.color }} className={classes.TodoText}>
                        {this.props.todo.title}
                    </div>
                    <FontAwesomeIcon onClick={this.deleteTodoHandler} icon={faTimes} className={classes.Icon} />
                    <FontAwesomeIcon onClick={this.changeCheckedHandler} icon={nextCheckIcon} className={classes.Icon} />
                </div>
                {descriptionElement}
            </div>
        );
    }
}

export default Todo;