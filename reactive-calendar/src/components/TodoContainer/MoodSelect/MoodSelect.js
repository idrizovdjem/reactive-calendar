import { useEffect, useState } from 'react';
import classes from "./MoodSelect.module.css";

import moodService from '../../../services/moodService.js';

import Alert from '../../Shared/Alert/Alert';

const MoodSelect = (props) => {
	const [errorMessages, setErrorMessages] = useState([]);
	const [mood, setMood] = useState(null);

	useEffect(() => {
		async function fetchMood() {
			const rawMoodResponse = await moodService.getForDay(props.date);
			const moodResponse = rawMoodResponse.data.response;
			if (!moodResponse.successfull) {
				setErrorMessages(moodResponse.errorMessages);
			}

			const mood = moodResponse.data.moodText;
			setMood(mood);
		}

		fetchMood();
	}, [props.date]);

	const updateMood = (event) => {
		const selectedMood = event.target.value;
		moodService.updateMood(props.date, selectedMood);
		setMood(selectedMood);
	};

	if(errorMessages.length > 0) {
		return errorMessages.map((message, index) => {
			return <Alert key={index} alert='danger' message={message} />
		});
	}

	return (
		<div className={classes.MoodContainer}>
			<span className={classes.MoodText}>How's your day going: </span>
			<select
				onChange={updateMood}
				defaultValue={mood}
				className={classes.MoodSelect}
			>
				<option className={classes.Excellent}>Excellent</option>
				<option className={classes.Good}>Good</option>
				<option className={classes.Average}>Average</option>
				<option className={classes.Bad}>Bad</option>
				<option className={classes.Miserable}>Miserable</option>
			</select>
		</div>
	);
}

export default MoodSelect;
