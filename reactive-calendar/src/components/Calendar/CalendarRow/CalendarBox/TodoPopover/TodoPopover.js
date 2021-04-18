import classes from './TodoPopover.module.css';

const TodoPopover = (props) => {
    return (
        <div className={classes.Popover}>
            <div 
                onClick={(event) => props.updateMoodHanlder(event, 'Miserable')} 
                className={`${classes.PopoverBox} ${classes.Miserable}`}
            ></div>

            <div 
                onClick={(event) => props.updateMoodHanlder(event, 'Bad')} className={`${classes.PopoverBox} ${classes.Bad}`}
            ></div>

            <div 
                onClick={(event) => props.updateMoodHanlder(event, 'Average')} className={`${classes.PopoverBox} ${classes.Average}`}
            ></div>
            
            <div 
                onClick={(event) => props.updateMoodHanlder(event, 'Good')} className={`${classes.PopoverBox} ${classes.Good}`}
            ></div>

            <div 
                onClick={(event) => props.updateMoodHanlder(event, 'Excellent')} 
                className={`${classes.PopoverBox} ${classes.Excellent}`}
            ></div>
        </div>
    );
}

export default TodoPopover;