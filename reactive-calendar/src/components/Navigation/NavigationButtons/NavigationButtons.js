import classes from './NavigationButtons.module.css';

const NavigationButtons = (props) => {
    let buttons = null;
    if (props.isAuthenticated) {
        buttons = (
            <span>
                <button
                    onClick={props.logout}
                    className={classes.NavigationButton}
                >Logout</button>

                <button
                    onClick={() => props.redirect('/Overview')}
                    className={classes.NavigationButton}
                >Overview</button>

                <button
                    onClick={() => props.redirect('/Calendar')}
                    className={classes.NavigationButton}
                >Calendar</button>
            </span>
        );
    } else {
        buttons = (
            <span>
                <button
                    onClick={() => props.redirect('/Register')}
                    className={classes.NavigationButton}
                >Register</button>

                <button
                    onClick={() => props.redirect('/Login')}
                    className={classes.NavigationButton}
                >Login</button>
            </span>
        );
    }

    return buttons;
}

export default NavigationButtons;