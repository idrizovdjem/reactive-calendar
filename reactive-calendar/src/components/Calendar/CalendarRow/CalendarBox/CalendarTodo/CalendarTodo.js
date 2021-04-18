import classes from './CalendarTodo.module.css';

const CalendarTodo = (props) => {
    const style = {
        backgroundColor: props.backgroundColor
    };

    return (
        <div style={style} className={classes.TodoRow}></div>
    );
}

export default CalendarTodo;