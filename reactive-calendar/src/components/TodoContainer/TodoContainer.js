import React, { Component } from 'react';
import classes from './TodoContainer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import axios from '../../axios.js';

import Todo from './Todo/Todo';
import TodoForm from './TodoForm/TodoForm';
import TodoLabels from './TodoLabels/TodoLabels';

class TodoContainer extends Component {
    state = {
        showCreateForm: false,
        todos: [
            { 
                title: 'Implement authentication',
                label: {
                    backgroundColor: 'violetblue',
                    color: 'white'
                },
                isChecked: true
            },
            {
                title: 'Implement backend service',
                label: {
                    backgroundColor: 'red',
                    color: 'white'
                },
                isChecked: false
            }
        ],
        currentTodo: {
            title: null,
            description: null,
            label: null
        }
    };
    
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

        return (
            <div className={classes.TodoContainer}>
                <span className={classes.CurrentDate}>Current date: 2021/03/31</span>

                <div className={classes.TodoSection}>
                    <span className={classes.TodoSectionText}>Todo section:</span>
                    <FontAwesomeIcon onClick={this.toggleCreateFormVisibility} icon={faPlusCircle} className={classes.Add} />

                    {createForm}

                    <div className={classes.Todos}>
                        {todos}
                    </div>
                </div>
            </div>
        );
    }
}

export default TodoContainer;