import classes from './BurgerButtons.module.css';

const BurgerButtons = (props) => {
    let burgerButtons = null;
    if (props.isAuthenticated) {
        burgerButtons = (
            <span>
                <div
                    onClick={() => props.redirect('/Calendar')}
                    className={classes.MobileLink}
                >Calendar</div>

                <div
                    onClick={() => props.redirect('/Overview')}
                    className={classes.MobileLink}
                >Overview</div>

                <div
                    onClick={props.logout}
                    className={classes.MobileLink}
                >Logout</div>
            </span>
        );
    } else {
        burgerButtons = (
            <span>
                <div
                    onClick={() => props.redirect('/Login')}
                    className={classes.MobileLink}
                >Login</div>

                <div
                    onClick={() => props.redirect('/Register')}
                    className={classes.MobileLink}
                >Register</div>
            </span>
        );
    }

    const burgerButtonsStyle = {
        display: props.showBurger ? 'block' : 'none'
    };

    return (
        <div style={burgerButtonsStyle} className={classes.MobileButtons}>
            {burgerButtons}
        </div>
    );
}

export default BurgerButtons;