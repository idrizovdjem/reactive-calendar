import React, { Component } from 'react';
import todoService from '../../services/todoService.js';
import calendarService from '../../services/calendarService.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import classes from './TodoContainer.module.css';

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
        currentDate: null,
        selectedLabel: null
    };
    
    async componentDidMount() {
        // * get select date
        // * get todos for the selected date
        // * update state

        const date = this.props.match.params.date;

        this.setState({ isLoading: true });
        const todosResponse = await todoService.getDailyTodos(date);

        if(!todosResponse.successfull) {
            this.setState({
                errorMessages: [...todosResponse.errorMessages],
                isLoading: false,
                currentDate: date
            });
        } else {
            this.setState({
                todos: [...todosResponse.data.todos],
                isLoading: false,
                currentDate: date
            });
        }
    }

    createTodoHandler = async (title, description) => {
        // validate label
        if(!this.state.selectedLabel) {
            alert('Choose label');
            return;
        }

        // validate title
        if(!title) {
            alert('Title is required!');
            return;
        } else {
            title = title.trim();
            if(title.length < 1) {
                alert('Title is required!');
                return;
            }
        }

        // validate description
        if(!description) {
            alert('Description is required!');
            return;
        } else {
            description = description.trim();
            if(description.length <  1) {
                alert('Description is required!');
                return;
            }
        }

        this.setState({ isLoading: true });

        const createTodoResponse = await todoService.create({
            title,
            description,
            labelText: this.state.selectedLabel.text,
            date: this.state.currentDate
        });

        const todoResponse = createTodoResponse.data.response;

        if(!todoResponse.successfull) {
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

    changeTodoLabelHandler = (label) => {
        this.setState({ selectedLabel: label });
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

        // display todos for current date
        let todos = [];
        this.state.todos.forEach((todo, index) => {
            const element = <Todo title={todo.title} label={todo.label} isChecked={todo.isChecked} key={index} />
            todos.push(element);
        });

        // display element if there are not todos
        let noTodosElement = null;
        if(this.state.todos.length === 0) {
            noTodosElement = <h3 className={classes.NoTodos}>No created todos! Create one :)</h3>
        }

        // display spinner while loading
        const spinner = this.state.isLoading ? <Spinner /> : null;

        // display alerts
        const alerts = [];
        this.state.errorMessages.forEach((message, index) => {
            alerts.push(<Alert alert='danger' message={message} key={index} />);
        });

        let stringDate = this.state.currentDate ? calendarService.convertFromNumber(this.state.currentDate) : null;

        return (
            <div className={classes.TodoContainer}>
                <span className={classes.CurrentDate}>Current date: {stringDate}</span>

                <div className={classes.TodoSection}>
                    <span className={classes.TodoSectionText}>Todo section:</span>
                    <FontAwesomeIcon onClick={this.toggleCreateFormVisibility} icon={faPlusCircle} className={classes.Add} />

                    {createForm}

                    <div className={classes.Todos}>
                        {alerts}
                        {spinner}
                        {todos}
                    </div>

                    {noTodosElement}
                </div>
            </div>
        );
    }
}

export default TodoContainer;