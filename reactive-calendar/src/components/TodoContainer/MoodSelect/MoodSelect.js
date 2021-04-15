import React, { Component } from "react";
import classes from "./MoodSelect.module.css";

import moodService from '../../../services/moodService.js';

class MoodSelect extends Component {
	state = {
		currentMood: null
	}

	async componentDidMount() {
		if(this.props.currentDate === null) {
			return;
		}

		const rawMoodResponse = await moodService.getForDay(this.props.currentDate);
		const moodResponse = rawMoodResponse.data.response;
		if (!moodResponse.successfull) {
			this.setState({
				errorMessages: [...moodResponse.errorMessages],
				isLoading: false,
			});
		}

		const mood = moodResponse.data.moodText;
		this.setState({ currentMood: mood });
	}

	updateMood = (event) => {
		const selectedMood = event.target.value;
		moodService.updateMood(this.props.currentDate, selectedMood);
		this.setState({ currentMood: selectedMood });
	};

	render() {
		if(this.state.currentMood === null) {
			return null;
		}

		return (
			<div className={classes.MoodContainer}>
				<span className={classes.MoodText}>How's your day going: </span>
				<select
					onChange={this.updateMood}
					defaultValue={this.state.currentMood}
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
}

export default MoodSelect;
