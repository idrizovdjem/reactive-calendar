import React, { Component } from 'react';
import classes from './TodoForm.module.css';

class TodoForm extends Component {
    constructor(props) {
        super(props);
        this.titleInput = React.createRef(null);
        this.descriptionTextArea = React.createRef(null);
    }
    
    createTodoHandler = () => {
        const title = this.titleInput.current.value;
        const description = this.descriptionTextArea.current.value;

        if(!title || !description) {
            alert('Title and description are required!');
            return;
        }

        this.titleInput.current.value = '';
        this.descriptionTextArea.current.value = '';

        this.props.create(title, description);
    }

    render() {
        return (
            <div className={classes.TodoForm}>
                <label htmlFor='title' className={classes.TitleLabel}>Title</label>
                <input type='text' placeholder='Something very important' id='title' className={classes.TitleInput} ref={this.titleInput} />
                <textarea className={classes.Textarea} placeholder='Describe the very important thing' ref={this.descriptionTextArea}></textarea>
                <button onClick={this.createTodoHandler} className={classes.CreateButton}>Create</button>
            </div>
        );
    }
}

export default TodoForm;