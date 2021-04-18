import classes from "./DateChanger.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const DateChanger = (props) => {
	return (
		<div className={classes.DateContainer}>
			<span>{props.dateLabel}: </span>
			<FontAwesomeIcon
				icon={faAngleLeft}
				className={classes.Button}
				onClick={() => props.updateDate(-1)}
			/>
			<span>{props.dateValue}</span>
			<FontAwesomeIcon
				icon={faAngleRight}
				className={classes.Button}
				onClick={() => props.updateDate(1)}
			/>
		</div>
	);
}

export default DateChanger;
