import { useState } from 'react';
import classes from './PresentationalTodo.module.css';

import todoService from '../../../../../../services/todoService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare, faTimes, faPen } from '@fortawesome/free-solid-svg-icons';

const PresentationalTodo = (props) => {
    const [showDescription, setShowDescription] = useState(false);
    const [isChecked, setIsChecked] = useState(props.todo.isChecked);

    let descriptionElement = null;
    if (showDescription) {
        descriptionElement = (
            <div className={classes.TodoDescription} >
                <div className={classes.ButtonsContainer} >
                    <FontAwesomeIcon
                        onClick={props.toggleEdit}
                        icon={faPen}
                        className={classes.Icon}
                    />
                    <FontAwesomeIcon
                        onClick={props.delete}
                        icon={faTimes}
                        className={classes.Icon}
                    />
                </div>
                <p className={classes.Title}>{props.title}</p>
                {props.description}
            </div>
        );
    }

    const toggleDescriptionHandler = () => {
        setShowDescription((oldState) => !oldState);
    }

    const changeCheckedHandler = async (event) => {
        event.stopPropagation();
        setIsChecked((oldState) => !oldState);
        await todoService.changeTodoCheckedState(props.todo.id, !isChecked);
    }

    const nextCheckIcon = isChecked ? faCheckSquare : faSquare;

    return (
        <div>
            <div
                onClick={toggleDescriptionHandler}
                style={props.todo.label}
                className={classes.Todo}
            >
                <div
                    style={{ color: props.todo.label.color }}
                    className={classes.TodoText}
                >
                    {props.title}
                </div>
                <FontAwesomeIcon
                    onClick={changeCheckedHandler}
                    icon={nextCheckIcon}
                    className={classes.CheckIcon}
                />
            </div>
            {descriptionElement}
        </div>
    );
}

export default PresentationalTodo;