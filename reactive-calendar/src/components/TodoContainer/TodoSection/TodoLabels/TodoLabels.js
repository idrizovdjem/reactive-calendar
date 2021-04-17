import React, { Component } from 'react';
import labelsService from '../../../../services/labelService.js';
import classes from './TodoLabels.module.css';

import Label from './Label/Label';
import Alert from '../../../Shared/Alert/Alert';
import Spinner from '../../../Shared/Spinner/Spinner';

class TodoLabels extends Component {
    state = {
        isLoading: true,
        errorMessages: [],
        labels: []
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        const labelsResponse = await labelsService.getAll();

        if(!labelsResponse.successfull) {
            this.setState({
                isLoading: false,
                errorMessages: [...labelsResponse.errorMessages]
            });
        } else {
            const labels = labelsResponse.data.labels.map(label => {
                label.isSelected = false;
                return label;
            })

            this.setState({
                isLoading: false,
                labels: [...labels]
            });
        }
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
        const spinner = this.state.isLoading ? <Spinner /> : null;
        const alerts = [];
        this.state.errorMessages.forEach(message => {
            alerts.push(<Alert alert='danger' message={message} />);
        });

        const labels = [];
        this.state.labels.map((label, index) => 
            labels.push(<Label change={this.changeLabelHandler} backgroundColor={label.backgroundColor} color={label.color} text={label.text} key={index} isSelected={label.isSelected} />));

        return (
            <div className={classes.TodoLabels}>
                {alerts}
                {spinner}
                {labels}
            </div>
        );
    }
}

export default TodoLabels;