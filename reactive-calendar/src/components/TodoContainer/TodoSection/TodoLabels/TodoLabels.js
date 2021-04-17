import { useState, useEffect } from 'react';
import classes from './TodoLabels.module.css';

import labelsService from '../../../../services/labelService.js';

import Label from './Label/Label';
import Alert from '../../../Shared/Alert/Alert';
import Spinner from '../../../Shared/Spinner/Spinner';

const TodoLabels = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const [labels, setLabels] = useState([]);

    useEffect(() => {
        async function fetchLabels() {
            setIsLoading(true);
            const labelsResponse = await labelsService.getAll();

            if (!labelsResponse.successfull) {
                setErrorMessages(labelsResponse.errorMessages);
            } else {
                const labels = labelsResponse.data.labels.map(label => {
                    label.isSelected = false;
                    return label;
                })

                setLabels(labels);
            }

            setIsLoading(false);
        }

        fetchLabels();
    }, []);

    const changeLabelHandler = (label) => {
        const labelsCopy = labels.slice();
        const selectedLabel = labelsCopy.find(labelCopy => labelCopy.backgroundColor === label.backgroundColor && labelCopy.color === label.color);

        labelsCopy.forEach(label => label.isSelected = false);

        selectedLabel.isSelected = true;
        setLabels(labelsCopy);

        props.change(label);
    }

    if (isLoading) {
        return <Spinner />
    }

    if (errorMessages.length > 0) {
        return errorMessages.map((message, index) => {
            return <Alert key={index} alert='danger' message={message} />
        });
    }

    return (
        <div className={classes.TodoLabels}>
            {labels.map((label, index) => {
                return (
                    <Label 
                        change={changeLabelHandler}
                        key={index}
                        label={label}
                    />
                );
            })}
        </div>
    );
}

export default TodoLabels;