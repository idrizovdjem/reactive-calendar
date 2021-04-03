import React, { Component } from 'react';
import todoService from '../../services/todoService.js';
import classes from './TodoContainer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import Alert from '../Alert/Alert';
import Spinner from '../Spinner/Spinner';
import Todo from './Todo/Todo';
import TodoForm from './TodoForm/TodoForm';
import TodoLabels from './TodoLabels/TodoLabels';

class TodoContainer extends Component {
    state = {
        isLoading: false,
        errorMessages: [],
        showCreateForm: false,
        todos: [],
        currentTodo: {
            title: null,
            description: null,
            label: null
        }
    };
    
    async componentDidMount() {
        const date = this.props.match.params.date;

        this.setState({ isLoading: true });
        const todosResponse = await todoService.getDailyTodos(date);

        if(!todosResponse.successfull) {
            this.setState({
                errorMessages: [...todosResponse.errorMessages],
                isLoading: false
            });
        } else {
            this.setState({
                todos: [...todosResponse.data.todos],
                isLoading: false
            });
        }
    }

    createTodoHandler = (title, description) => {
        if(!this.state.currentTodo.label) {
            alert('Choose label');
            return;
        }

        const currentTodo = this.state.currentTodo;
        currentTodo.title = title;
        currentTodo.description = description;

        const todos = this.state.todos;
        // TODO: Implement todo create
        this.setState({ 
            todos: [ ...todos, currentTodo ],
            currentTodo: {
                title: null,
                description: null,
                label: null
            },
            showCreateForm: false
        });
    }

    changeTodoLabelHandler = (label) => {
        const currentTodo = this.state.currentTodo;
        currentTodo.label = label;
        this.setState({ currentTodo: currentTodo });
    }

    toggleCreateFormVisibility = () => {
        this.setState({ showCreateForm: !this.state.showCreateForm });
    }

    render() {
        let createForm = null;
        if (this.state.showCreateForm) {
            createForm = (
                <div className={classes.Form}>
                    <TodoForm create={this.createTodoHandler} />
                    <TodoLabels change={this.changeTodoLabelHandler} />
                </div>
            );
        }

        let todos = [];
        if(this.state.todos.length > 0) {
            for(const todo of this.state.todos) {
                const element = <Todo title={todo.title} label={todo.label} isChecked={todo.isChecked} key={todo.title} />
                todos.push(element);
            }
        }

        const spinner = this.state.isLoading ? <Spinner /> : null;
        const alerts = [];
        this.state.errorMessages.forEach((message, index) => {
            alerts.push(<Alert alert='danger' message={message} key={index} />);
        });

        return (
            <div className={classes.TodoContainer}>
                <span className={classes.CurrentDate}>Current date: 2021/03/31</span>

                <div className={classes.TodoSection}>
                    <span className={classes.TodoSectionText}>Todo section:</span>
                    <FontAwesomeIcon onClick={this.toggleCreateFormVisibility} icon={faPlusCircle} className={classes.Add} />

                    {createForm}

                    <div className={classes.Todos}>
                        {alerts}
                        {spinner}
                        {todos}
                    </div>
                </div>
            </div>
        );
    }
}

export default TodoContainer;