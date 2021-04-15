import React, { Component } from 'react';
import classes from './TodoList.module.css';

import Todo from './Todo/Todo';

class TodoList extends Component {
    render() {
        const passedTodos = this.props.todos;

        if(!passedTodos || this.props.todos.length === 0) {
            return <h3>No created todos! Create one :)</h3>;
        }

        // display todos for current date
        let todos = [];
        this.props.todos.forEach((todo) => {
            const element = <Todo todo={todo} onDelete={this.props.deleteTodo} key={todo.id} />
            todos.push(element);
        });

        return (
            <div className={classes.Todos}>
                {todos}
            </div>
        );
    }
}

export default TodoList;