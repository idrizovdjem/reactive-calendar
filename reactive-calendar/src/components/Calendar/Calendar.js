import React, { Component } from "react";
import classes from "./Calendar.module.css";

import calendarService from "../../services/calendarService.js";
import moodService from "../../services/moodService.js";
import todoService from "../../services/todoService.js";

import SideBar from './SideBar/SideBar';
import CalendarHeaderRow from './CalendarHeaderRow/CalendarHeaderRow';
import CalendarRow from './CalendarRow/CalendarRow';
import Alert from '../Shared/Alert/Alert';
import Spinner from '../Shared/Spinner/Spinner';

class Calendar extends Component {
	state = {
		isLoading: false,
		errorMessages: [],
		days: [],
		date: {},
	};

	componentDidMount() {
		// * get current date
		// * get days for the calendar
		// * get todos for the days

		const currentDate = calendarService.getCurrentDate();
		this.setState({ date: currentDate }, async () => {
			await this.updateCalendar();
		});	
	}

	updateCalendar = async () => {
		this.setState({ isLoading: true });
		const { year, month } = this.state.date;

		const currentDays = calendarService.getCalendarDays(year, month);

		const startDate = currentDays[0].date;
		const endDate = currentDays[currentDays.length - 1].date;
		
		const todosResponse = await todoService.getTodosForDates(
			startDate,
			endDate
		);
		if (!todosResponse.successfull) {
			this.setState({
				isLoading: false,
				errorMessages: [...todosResponse.errorMessages],
			});
			return;
		}

		const dateTodos = todosResponse.data.todos;
		dateTodos.forEach((todo) => {
			const day = currentDays.find((day) => day.date === todo.date);
			
			if (day.todos.length < 3) {
				day.todos.push(todo);
			}
		});

		// update moods
		const rawDayMoodsResponse = await moodService.getForRange(
			startDate,
			endDate
		);
		const dayMoodsResponse = rawDayMoodsResponse.data.response;
		const dayMoods = dayMoodsResponse.data.dateMoods;
		dayMoods.forEach((dateMood) => {
			const date = currentDays.find((day) => day.date === dateMood.date);
			date.moodColor = moodService.getMoodColor(dateMood.mood);
		});

		this.setState({
			isLoading: false,
			days: [...currentDays]
		});
	}

	async componentDidUpdate(prevProps, prevState) {
		const prevDate = prevState.date;

		if(prevDate.year !== this.state.date.year || prevDate.month !== this.state.date.month) {
			await this.updateCalendar();
		}
	}

	updateDate = (year, month) => {
		const { day } = this.state.date;

		this.setState({
			date: {
				year,
				month,
				day
			}
		});
	};

	render() {
		if (this.state.errorMessages.length > 0) {
			const alerts = this.state.errorMessages.map((message, index) => {
				return <Alert alert="danger" message={message} key={index} />;
			});

			return alerts;
		}

		if (this.state.isLoading) {
			return <Spinner />;
		}

		// display days
		const calendarRows = [];
		if (this.state.days.length !== 0) {
			let next = 0;
			for (let i = 0; i < 6; i++) {
				const currentRowDays = [];
				for (let j = 0; j < 7; j++) {
					currentRowDays.push(this.state.days[next++]);
				}

				calendarRows.push(
					<CalendarRow
						redirect={this.props.redirect}
						key={i}
						days={currentRowDays}
					/>
				);
			}
		}

		const sideBarDateObject = {
			year: this.state.date.year || 0,
			month: this.state.date.month || 0
		};
		
		return (
			<div>
				<SideBar date={sideBarDateObject} updateDate={this.updateDate} />
				<div className={classes.Calendar}>
					<CalendarHeaderRow />
					{calendarRows}
				</div>
			</div>
		);
	}
}

export default Calendar;
