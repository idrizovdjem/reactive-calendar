import React, { Component } from 'react';
import classes from './TodoLabels.module.css';

import Label from './Label/Label';

class TodoLabels extends Component {
    state = {
        labels: [
            {
                backgroundColor: 'red',
                color: 'white',
                text: 'Very Important',
                isSelected: false
            },
            {
                backgroundColor: 'violetblue',
                color: 'white',
                text: 'Important',
                isSelected: false
            },
            {
                backgroundColor: 'blue',
                color: 'white',
                text: 'Work',
                isSelected: false
            },
            {
                backgroundColor: 'yellow',
                color: 'black',
                text: 'Tasks',
                isSelected: false
            },
            {
                backgroundColor: 'green',
                color: 'white',
                text: 'Hobby',
                isSelected: false
            }
        ]
    }

    changeLabelHandler = (label) => {
        const labelsCopy = this.state.labels.slice();
        const selectedLabel = labelsCopy.find(labelCopy => labelCopy.backgroundColor === label.backgroundColor && labelCopy.color === label.color);

        for(const labelCopy of labelsCopy) {
            labelCopy.isSelected = false;
        }

        selectedLabel.isSelected = true;
        this.setState({ labels: [...labelsCopy ]});

        this.props.change(label);
    }

    render() {
        const labels = [];
        this.state.labels.map((label, index) => 
            labels.push(<Label change={this.changeLabelHandler} backgroundColor={label.backgroundColor} color={label.color} text={label.text} key={index} isSelected={label.isSelected} />));

        return (
            <div className={classes.TodoLabels}>
                {labels}
            </div>
        );
    }
}

export default TodoLabels;