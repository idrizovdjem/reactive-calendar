import { useState } from 'react';
import classes from './Todo.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare, faTimes, faPen } from '@fortawesome/free-solid-svg-icons';

import todoService from '../../../../../services/todoService.js';

const Todo = (props) => {
    const [title, setTitle] = useState(props.todo.title);
    const [description, setDescription] = useState(props.todo.description);
    const [isChecked, setIsChecked] = useState(props.todo.isChecked);
    const [showDescription, setShowDescription] = useState(false);
    const [isEditable, setIsEditable] = useState(false);

    const changeCheckedHandler = async (event) => {
        event.stopPropagation();
        const id = props.todo.id;
        setIsChecked((oldState) => !oldState);
        await todoService.changeTodoCheckedState(id, isChecked);
    }

    const toggleDescriptionHandler = () => {
        setShowDescription((oldState) => !oldState);
    }

    const editTodoHandler = (event) => {
        event.stopPropagation();
        if (isEditable) {
            setShowDescription(false);
            setIsEditable(false);
        } else {
            setShowDescription(true);
            setIsEditable(true);
        }
    }

    const saveChangesHandler = (event) => {
        event.preventDefault();
        let title = event.target.title.value;
        let description = event.target.description.value;

        if (!title) {
            alert('Title is required!');
            return;
        }

        if (!description) {
            alert('Description is required!');
            return;
        }

        setTitle(title);
        setDescription(description);

        todoService.updateTodo(props.todo.id, title, description);

        setShowDescription(false);
        setIsEditable(false);
    }

    const cancelHandler = (event) => {
        event.preventDefault();
        setShowDescription(false);
        setIsEditable(false);
    }

    const deleteTodoHandler = (event) => {
        event.stopPropagation();
        props.onDelete(props.todo.id);
    }

    const nextCheckIcon = isChecked ? faCheckSquare : faSquare;
    let descriptionElement = null;

    let todoElement = null;
    if (isEditable) {
        if (showDescription) {
            descriptionElement = (
                <textarea 
                    name='description'
                    defaultValue={description}
                    className={classes.DescriptionTextArea} 
                    rows='5'
                />
            );
        }

        todoElement = (
            <form onSubmit={saveChangesHandler}>
                <div style={props.todo.label} className={classes.Todo}>
                    <input name='title' className={classes.EditInput} type='text' defaultValue={title} />
                </div>
                <div className={classes.EditButtonsContainer}>
                    <button className={`${classes.EditButton} ${classes.SaveChanges}`}>Save changes</button
                    >
                    <button onClick={cancelHandler} className={`${classes.EditButton} ${classes.Cancel}`}>Cancel</button>
                </div>
                {descriptionElement}
            </form>);
    } else {
        if (showDescription) {
            descriptionElement = (
                <div className={classes.TodoDescription}>
                    <div className={classes.ButtonsContainer}>
                        <FontAwesomeIcon onClick={editTodoHandler} icon={faPen} className={classes.Icon} />
                        <FontAwesomeIcon onClick={deleteTodoHandler} icon={faTimes} className={classes.Icon} />
                    </div>
                    <p className={classes.Title}>{title}</p>
                    {description}
                </div>
            );
        }

        todoElement = (
            <div>
                <div onClick={toggleDescriptionHandler} style={props.todo.label} className={classes.Todo}>
                    <div style={{ color: props.todo.label.color }} className={classes.TodoText}>
                        {title}
                    </div>
                    <FontAwesomeIcon onClick={changeCheckedHandler} icon={nextCheckIcon} className={classes.CheckIcon} />
                </div>
                {descriptionElement}
            </div>);
    }

    return todoElement;
}

export default Todo;