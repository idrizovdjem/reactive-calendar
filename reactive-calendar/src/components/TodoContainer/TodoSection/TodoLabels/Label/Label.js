import classes from './Label.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const Label = (props) => {
    const changeLabelHandler = () => {
        props.change(props.label);
    }

    const style = {
        backgroundColor: props.label.backgroundColor,
        color: props.label.color
    };

    let checkedElement = null;
    if (props.label.isSelected) {
        checkedElement = (
            <FontAwesomeIcon 
                icon={faCheck} 
                className={classes.Icon} 
                style={{ color: props.label.color }} 
            />
        );
    }

    return (
        <div onClick={changeLabelHandler} className={classes.Label}>
            {checkedElement}
            <p style={style} className={classes.LabelText}>{props.label.text}</p>
        </div>
    );
}

export default Label;