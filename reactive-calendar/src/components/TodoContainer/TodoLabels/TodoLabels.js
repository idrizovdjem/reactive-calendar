import React, { Component } from 'react';
import classes from './TodoLabels.module.css';

import Label from './Label/Label';

class TodoLabels extends Component {

    render() {
        return (
            <div className={classes.TodoLabels}>
                <Label backgroundColor='red' color='white' text='Very important'/>
                <Label backgroundColor='violetblue' color='white' text='Important'/>
                <Label backgroundColor='blue' color='white' text='Work' />
                <Label backgroundColor='yellow' color='black' text='Task'/>
                <Label backgroundColor='green' color='white' text='Hobby'/>
            </div>
        );
    }
}

export default TodoLabels;