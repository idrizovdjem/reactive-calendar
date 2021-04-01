import React, { Component } from 'react';
import classes from './TodoForm.module.css';

class TodoForm extends Component {

    render() {
        return (
            <div className={classes.TodoForm}>
                <label htmlFor='title' className={classes.TitleLabel}>Title</label>
                <input type='text' placeholder='Something very important' id='title' className={classes.TitleInput}/>
                <textarea className={classes.Textarea} placeholder='Describe the very important thing'></textarea>
                <button className={classes.CreateButton}>Create</button>
            </div>
        );
    }
}

export default TodoForm;