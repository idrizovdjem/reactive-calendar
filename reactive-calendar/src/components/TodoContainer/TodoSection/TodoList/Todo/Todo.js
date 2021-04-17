import { useState } from 'react';

import PresentationalTodo from './PresentationalTodo/PresentationalTodo';
import EditableTodo from './EditableTodo/EditableTodo';

const Todo = (props) => {
    const [title, setTitle] = useState(props.todo.title);
    const [description, setDescrition] = useState(props.todo.description);
    const [isEditable, setIsEditable] = useState(false);

    const deleteTodoHandler = (event) => {
        event.stopPropagation();
        props.onDelete(props.todo.id);
    }

    const updateTodo = (title, description) => {
        setTitle(title);
        setDescrition(description);
        setIsEditable(false);
    }

    const toggleEditableState = () => {
        setIsEditable(oldState => !oldState);
    }

    if(isEditable) {
        return (
            <EditableTodo 
                title={title}
                description={description}
                todo={props.todo}
                edit={updateTodo}
                delete={deleteTodoHandler}
            />
        );
    }

    return (
        <PresentationalTodo 
            title={title}
            description={description}
            todo={props.todo}
            toggleEdit={toggleEditableState}
            delete={deleteTodoHandler}
        />
    );
}

export default Todo;