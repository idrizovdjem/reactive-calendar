import React, { Component } from 'react';
import classes from './TodoSection.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import todoService from '../../../services/todoService.js';

import Alert from '../../Shared/Alert/Alert';
import TodoForm from './TodoForm/TodoForm';
import TodoList from './TodoList/TodoList';
import TodoLabels from './TodoLabels/TodoLabels';

class TodoSection extends Component {
    state = {
        isLoading: false,
        errorMessages: [],
        showCreateForm: false,
        selectedLabel: null,
        todos: []
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        const todosResponse = await todoService.getDailyTodos(this.props.date);

        if (!todosResponse.successfull) {
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

    createTodoHandler = async (title, description) => {
        // validate label
        if (!this.state.selectedLabel) {
            alert('Choose label');
            return;
        }

        this.setState({ isLoading: true });

        const createTodoResponse = await todoService.create({
            title,
            description,
            labelText: this.state.selectedLabel.text,
            date: this.props.date
        });

        const todoResponse = createTodoResponse.data.response;

        if (!todoResponse.successfull) {
            this.setState({
                errorMessages: [...todoResponse.errorMessages],
                isLoading: false,
                selectedLabel: null,
                showCreateForm: false
            });
        } else {
            const createdTodo = todoResponse.data.todo;
            createdTodo.label = this.state.selectedLabel;
            this.setState({
                isLoading: false,
                todos: [...this.state.todos, createdTodo],
                selectedLabel: null,
                showCreateForm: false
            });
        }
    }

    deleteTodo = (todoId) => {
        const todosCopy = this.state.todos.slice();
        const todoIndex = todosCopy.findIndex(todo => todo.id === todoId);

        if (todoIndex === -1) {
            return;
        }

        todoService.deleteTodo(todoId);

        todosCopy.splice(todoIndex, 1);
        this.setState({ todos: [...todosCopy] });
    }

    render() {
        // display alerts
        const alerts = [];
        this.state.errorMessages.forEach((message, index) => {
            alerts.push(<Alert alert='danger' message={message} key={index} />);
        });

        if (alerts.length > 0) {
            return alerts;
        }

        return (
            <div className={classes.TodoSection}>
                <span className={classes.TodoSectionText}>Todo section:</span>
                <FontAwesomeIcon onClick={() => this.setState({ showCreateForm: !this.state.showCreateForm })} icon={faPlusCircle} className={classes.Add} />

                {
                    this.state.showCreateForm ?
                    (
                        <div className={classes.Form}>
                            <TodoForm create={this.createTodoHandler} />
                            <TodoLabels change={(label) => this.setState({ selectedLabel: label })} />
                        </div>
                    ) : null
                }
                <TodoList todos={this.state.todos} deleteTodo={this.deleteTodo} />
            </div>
        );
    }
}

export default TodoSection;