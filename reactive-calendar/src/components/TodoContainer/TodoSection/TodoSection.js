import { useState, useEffect } from 'react';
import classes from './TodoSection.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import todoService from '../../../services/todoService.js';

import Spinner from '../../Shared/Spinner/Spinner';
import Alert from '../../Shared/Alert/Alert';
import TodoForm from './TodoForm/TodoForm';
import TodoList from './TodoList/TodoList';
import TodoLabels from './TodoLabels/TodoLabels';

const TodoSection = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState(null);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        async function fetchTodos() {
            setIsLoading(true);
            const todosResponse = await todoService.getDailyTodos(props.date);

            if (!todosResponse.ok) {
                setErrorMessages(todosResponse.errorMessages);
            } else {
                setTodos(todosResponse.data.todos);
            }

            setIsLoading(false);
        }

        fetchTodos();
    }, [props.date]);

    const createTodoHandler = async (title, description) => {
        if (selectedLabel === null) {
            alert('Choose label');
            return;
        }

        setIsLoading(true);

        const createTodoResponse = await todoService.create({
            title,
            description,
            labelText: selectedLabel.text,
            date: props.date
        });

        const todoResponse = createTodoResponse.data.response;

        if (!todoResponse.ok) {
            setErrorMessages(todoResponse.errorMessages);
        } else {
            const createdTodo = todoResponse.data.todo;
            createdTodo.label = selectedLabel;
            setTodos((oldTodos) => [...oldTodos, createdTodo]);
        }

        setIsLoading(false);
        setSelectedLabel(null);
        setShowCreateForm(false);
    }

    const deleteTodo = (todoId) => {
        const todosCopy = todos.slice();
        const todoIndex = todosCopy.findIndex(todo => todo.id === todoId);

        if (todoIndex === -1) {
            return;
        }

        todoService.deleteTodo(todoId);

        todosCopy.splice(todoIndex, 1);
        setTodos(todosCopy);
    }
  
    const toggleShowCreateForm = () => {
        setShowCreateForm((oldState) => !oldState);
    }

    const changeLabelHandler = (label) => {
        setSelectedLabel(label);
    }

    if(isLoading) {
        return <Spinner />
    }

    if(errorMessages.length > 0) {
        return errorMessages.map((message, index) => {
            return <Alert key={index} alert='danger' message={message} />
        });
    }

    return (
        <div className={classes.TodoSection}>
            <span className={classes.TodoSectionText}>Todo section:</span>
            <FontAwesomeIcon onClick={toggleShowCreateForm} icon={faPlusCircle} className={classes.Add} />

            {
                showCreateForm ?
                    (
                        <div className={classes.Form}>
                            <TodoForm create={createTodoHandler} />
                            <TodoLabels change={changeLabelHandler} />
                        </div>
                    ) : null
            }
            <TodoList todos={todos} deleteTodo={deleteTodo} />
        </div>
    );
}

export default TodoSection;