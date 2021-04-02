import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import classes from './Label.module.css';

class Label extends Component {
    state = {
        isSelected: this.props.isSelected
    }

    changeLabelHandler = () => {
        const label = {
            backgroundColor: this.props.backgroundColor,
            color: this.props.color
        };

        this.props.change(label);
    }

    render() {
        const style = {
            backgroundColor: this.props.backgroundColor,
            color: this.props.color
        };

        const checkedElement = this.props.isSelected ? <FontAwesomeIcon icon={faCheck} className={classes.Icon} style={{ color: this.props.color }}/> : null;

        return (
            <div onClick={this.changeLabelHandler} className={classes.Label}>
                {checkedElement}
                <p style={style} className={classes.LabelText}>{this.props.text}</p>
            </div>
        );
    }
}

export default Label;