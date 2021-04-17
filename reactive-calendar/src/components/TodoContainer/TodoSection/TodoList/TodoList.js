import classes from './TodoList.module.css';

import Todo from './Todo/Todo';

const TodoList = (props) => {
    if (props.todos.length === 0) {
        return <h3>No created todos! Create one :)</h3>;
    }

    const todos = props.todos.map((todo) => {
        return (
            <Todo 
                todo={todo} 
                onDelete={props.deleteTodo} 
                key={todo.id} 
            />
        );
    });

    return (
        <div className={classes.Todos}>
            {todos}
        </div>
    );
}

export default TodoList;