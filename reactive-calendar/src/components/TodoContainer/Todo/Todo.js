import React, { Component } from 'react';
import classes from './Todo.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';

class Todo extends Component {
    state = {
        icon: faSquare
    }

    componentDidMount() {
        let icon = this.props.isChecked ? faCheckSquare : faSquare;
        this.setState({ icon: icon });
    }

    // TODO: change todo isChecked
    changeCheckedHandler = () => {
        const nextIcon = this.state.icon === faSquare ? faCheckSquare : faSquare;
        this.setState({ icon: nextIcon });
    }

    render() {
        return (
            <div style={this.props.label} className={classes.Todo}>
                <div style={{ color: this.props.label.color }} className={classes.TodoText}>
                    {this.props.title}
                </div>
                <FontAwesomeIcon onClick={this.changeCheckedHandler} icon={this.state.icon} className={classes.Icon} />
            </div>
        );
    }
}

export default Todo;