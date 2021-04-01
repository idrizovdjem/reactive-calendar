import React, { Component } from 'react';
import classes from './Todo.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';

class Todo extends Component {
    state = {
        icon: faSquare
    }

    changeCheckedHandler = () => {
        const nextIcon = this.state.icon === faSquare ? faCheckSquare : faSquare;
        this.setState({ icon : nextIcon });
    }

    render() {
        return (
            <div className={classes.Todo}>
                <div className={classes.TodoText}>TextTextTextTextTextTextTextTextTextText...</div>
                <FontAwesomeIcon onClick={this.changeCheckedHandler} icon={this.state.icon} className={classes.Icon} />
            </div>
        );
    }
}

export default Todo;