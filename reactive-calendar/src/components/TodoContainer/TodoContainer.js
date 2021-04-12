import React, { Component } from 'react';
import todoService from '../../services/todoService.js';
import calendarService from '../../services/calendarService.js';
import moodService from '../../services/moodService.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import classes from './TodoContainer.module.css';

import Alert from '../Alert/Alert';
import Spinner from '../Spinner/Spinner';
import Todo from './Todo/Todo';
import TodoForm from './TodoForm/TodoForm';
import TodoLabels from './TodoLabels/TodoLabels';

class TodoContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            errorMessages: [],
            showCreateForm: false,
            todos: [],
            currentDate: null,
            selectedLabel: null,
            currentMood: null
        };
    }

    async componentDidMount() {
        // * get select date
        // * get todos for the selected date
        // * update state

        const date = this.props.match.params.date;

        this.setState({ isLoading: true });
        const todosResponse = await todoService.getDailyTodos(date);

        if (!todosResponse.successfull) {
            this.setState({
                errorMessages: [...todosResponse.errorMessages],
                isLoading: false,
                currentDate: date
            });
        } else {
            const rawMoodResponse = await moodService.getForDay(date);
            const moodResponse = rawMoodResponse.data.response;
            if (!moodResponse.successfull) {
                this.setState({
                    errorMessages: [...moodResponse.errorMessages],
                    isLoading: false,
                    currentDate: date
                });
            }

            const mood = moodResponse.data.moodText;

            this.setState({
                todos: [...todosResponse.data.todos],
                isLoading: false,
                currentDate: date,
                currentMood: mood
            });
        }
    }

    createTodoHandler = async (title, description) => {
        // validate label
        if (!this.state.selectedLabel) {
            alert('Choose label');
            return;
        }

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

        this.setState({ isLoading: true });

        const createTodoResponse = await todoService.create({
            title,
            description,
            labelText: this.state.selectedLabel.text,
            date: this.state.currentDate
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

    changeTodoLabelHandler = (label) => {
        this.setState({ selectedLabel: label });
    }

    toggleCreateFormVisibility = () => {
        this.setState({ showCreateForm: !this.state.showCreateForm });
    }

    updateCurrentMood = (event) => {
        const selectedMood = event.target.value;
        moodService.updateMood(this.state.currentDate, selectedMood);
        this.setState({ currentMood: selectedMood });
    }

    deleteTodo = (todoId) => {
        const todosCopy = this.state.todos.slice();
        const todoIndex = todosCopy.findIndex(todo => todo.id === todoId);
        
        if(todoIndex === -1) {
            return;
        }

        todoService.deleteTodo(todoId);

        todosCopy.splice(todoIndex, 1);
        this.setState({ todos: [...todosCopy] });
    }

    render() {
        // display spinner while loading
        if (this.state.isLoading) {
            return <Spinner />
        }

        // display alerts
        const alerts = [];
        this.state.errorMessages.forEach((message, index) => {
            alerts.push(<Alert alert='danger' message={message} key={index} />);
        });
        if (alerts.length > 0) {
            return alerts;
        }

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
        this.state.todos.forEach((todo) => {
            const element = <Todo todo={todo} onDelete={this.deleteTodo} key={todo.id} />
            todos.push(element);
        });

        // display element if there are not todos
        let noTodosElement = null;
        if (this.state.todos.length === 0) {
            noTodosElement = <h3 className={classes.NoTodos}>No created todos! Create one :)</h3>
        }

        let stringDate = this.state.currentDate ? calendarService.convertFromNumber(this.state.currentDate) : null;

        return (
            <div className={classes.TodoContainer}>
                <span className={classes.CurrentDate}>Current date: {stringDate}</span>

                <div className={classes.MoodContainer}>
                    <span className={classes.MoodText}>How's your day going: </span>
                    <select onChange={this.updateCurrentMood} defaultValue={this.state.currentMood} ref={this.moodSelect} className={classes.MoodSelect}>
                        <option className={classes.Excellent}>Excellent</option>
                        <option className={classes.Good}>Good</option>
                        <option className={classes.Average}>Average</option>
                        <option className={classes.Bad}>Bad</option>
                        <option className={classes.Miserable}>Miserable</option>
                    </select>
                </div>

                <div className={classes.TodoSection}>
                    <span className={classes.TodoSectionText}>Todo section:</span>
                    <FontAwesomeIcon onClick={this.toggleCreateFormVisibility} icon={faPlusCircle} className={classes.Add} />

                    {createForm}

                    <div className={classes.Todos}>
                        {todos}
                    </div>

                    {noTodosElement}
                </div>
            </div>
        );
    }
}

export default TodoContainer;