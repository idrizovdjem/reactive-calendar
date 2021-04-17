import classes from './EditableTodo.module.css';

import todoService from '../../../../../../services/todoService';

const EditableTodo = (props) => {
    const saveChangesHandler = (event) => {
        event.preventDefault();
        let title = event.target.title.value;
        let description = event.target.description.value;

        if (!title) {
            alert('Title is required!');
            return;
        }

        if (!description) {
            alert('Description is required!');
            return;
        }

        todoService.updateTodo(props.todo.id, title, description);
        props.edit(title, description);
    }
    
    const descriptionElement = (
        <textarea
            name='description'
            defaultValue={props.description}
            className={classes.DescriptionTextArea}
            rows='5'
        />
    );

    return (
        <form onSubmit={saveChangesHandler}>
            <div 
                style={props.todo.label}
                className={classes.Todo}
            >
                <input 
                    name='title' 
                    type='text' 
                    className={classes.EditInput} 
                    defaultValue={props.title} 
                />
            </div>

            <div className={classes.EditButtonsContainer} >
                <button className={`${classes.EditButton} ${classes.SaveChanges}`}>Save changes</button>

                <button onClick={props.toggleEdit} className={`${classes.EditButton} ${classes.Cancel}`}>Cancel</button>
            </div>
            {descriptionElement}
        </form>
    );
}

export default EditableTodo;