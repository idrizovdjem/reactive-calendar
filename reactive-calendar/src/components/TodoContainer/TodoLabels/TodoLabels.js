import React, { Component } from 'react';
import classes from './TodoLabels.module.css';

import Label from './Label/Label';

class TodoLabels extends Component {

    render() {
        return (
            <div className={classes.TodoLabels}>
                <Label />
                <Label />
                <Label />
            </div>
        );
    }
}

export default TodoLabels;