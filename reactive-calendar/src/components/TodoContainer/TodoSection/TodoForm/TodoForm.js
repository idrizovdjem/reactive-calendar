import classes from './TodoForm.module.css';

const TodoForm = (props) => {
    const onSubmit = (event) => {
        event.preventDefault();
        let title = event.target.title.value;
        let description = event.target.description.value;

        // validate title
        if (!title) {
            alert('Title is required!');
            return;
        } else {
            title = title.trim();
            if (title.length < 1) {
                alert('Title is required!');
                return;
            }
        }

        // validate description
        if (!description) {
            alert('Description is required!');
            return;
        } else {
            description = description.trim();
            if (description.length < 1) {
                alert('Description is required!');
                return;
            }
        }

        props.create(title, description);
    }

    return (
        <form onSubmit={onSubmit} className={classes.TodoForm}>
            <label htmlFor='title' className={classes.TitleLabel}>Title</label>
            <input 
                type='text' 
                placeholder='Something very important' 
                id='title' 
                className={classes.TitleInput} 
                name='title' 
            />
            <textarea 
                className={classes.Textarea} 
                placeholder='Describe the very important thing' 
                name='description' 
            />
            <button className={classes.CreateButton}>Create</button>
        </form>
    );
}

export default TodoForm;