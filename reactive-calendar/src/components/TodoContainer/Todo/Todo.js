import React, { Component } from 'react';
import classes from './Todo.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare, faTimes, faPen } from '@fortawesome/free-solid-svg-icons';
import todoService from '../../../services/todoService.js';

class Todo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.todo.title,
            description: this.props.todo.description,
            isChecked: this.props.todo.isChecked,
            showDescription: false,
            isEditable: false
        };

        this.titleInput = React.createRef();
        this.descriptionTextArea = React.createRef();
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

    editTodoHandler = (event) => {
        event.stopPropagation();
        if(this.state.isEditable) {
            this.setState({ showDescription: false, isEditable: false });
        } else {
            this.setState({ showDescription: true, isEditable: true });
        }
    }

    saveChangesHandler = () => {
        let title = this.titleInput.current.value;
        let description = this.descriptionTextArea.current.value;

        // validate title
        if (!title) {
            alert('Title is required!');
            return;
        } else {
            title = title.trim();
            if (title.length < 1) {
                alert('Title is required!');
                return;
            }
        }

        // validate description
        if (!description) {
            alert('Description is required!');
            return;
        } else {
            description = description.trim();
            if (description.length < 1) {
                alert('Description is required!');
                return;
            }
        }
        
        this.setState({
            title,
            description
        });

        todoService.updateTodo(this.props.todo.id, title, description);

        this.setState({ showDescription: false, isEditable: false });
    }

    cancelHandler = () => {
        this.setState({ showDescription: false, isEditable: false });
    }

    deleteTodoHandler = (event) => {
        event.stopPropagation();
        this.props.onDelete(this.props.todo.id);
    }

    render() {
        const nextCheckIcon = this.state.isChecked ? faCheckSquare : faSquare;

        let descriptionElement = null;
        

        let todoElement = null;
        if (this.state.isEditable) {
            if (this.state.showDescription) {
                descriptionElement = (
                    <textarea defaultValue={this.state.description} ref={this.descriptionTextArea} className={classes.DescriptionTextArea} rows='5'>
                    </textarea>
                );
            }

            todoElement = (
                <div>
                    <div style={this.props.todo.label} className={classes.Todo}>
                        <input ref={this.titleInput} className={classes.EditInput} type='text' defaultValue={this.state.title} />
                    </div>
                    <div className={classes.EditButtonsContainer}>
                        <button onClick={this.saveChangesHandler} className={`${classes.EditButton} ${classes.SaveChanges}`}>Save changes</button>
                        <button onClick={this.cancelHandler} className={`${classes.EditButton} ${classes.Cancel}`}>Cancel</button>
                    </div>
                    {descriptionElement}
                </div>);
        } else {
            if (this.state.showDescription) {
                descriptionElement = (
                    <div className={classes.TodoDescription}>
                        <div className={classes.ButtonsContainer}>
                            <FontAwesomeIcon onClick={this.editTodoHandler} icon={faPen} className={classes.Icon} />
                            <FontAwesomeIcon onClick={this.deleteTodoHandler} icon={faTimes} className={classes.Icon} />
                        </div>
                        {this.state.description}
                    </div>
                );
            }

            todoElement = (
                <div>
                    <div onClick={this.toggleDescriptionHandler} style={this.props.todo.label} className={classes.Todo}>
                        <div style={{ color: this.props.todo.label.color }} className={classes.TodoText}>
                            {this.state.title}
                        </div>
                        <FontAwesomeIcon onClick={this.changeCheckedHandler} icon={nextCheckIcon} className={classes.CheckIcon} />
                    </div>
                    {descriptionElement}
                </div>);
        }

        return todoElement;
    }
}

export default Todo;