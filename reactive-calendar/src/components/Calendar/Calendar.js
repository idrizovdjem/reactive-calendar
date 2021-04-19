import { useState, useEffect } from 'react';
import classes from "./Calendar.module.css";

import calendarService from "../../services/calendarService.js";
import moodService from "../../services/moodService.js";
import todoService from "../../services/todoService.js";

import SideBar from './SideBar/SideBar';
import CalendarHeaderRow from './CalendarHeaderRow/CalendarHeaderRow';
import CalendarRow from './CalendarRow/CalendarRow';
import Alert from '../Shared/Alert/Alert';
import Spinner from '../Shared/Spinner/Spinner';

const Calendar = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessages, setErrorMessages] = useState([]);
	const [days, setDays] = useState([]);
	const [date, setDate] = useState({});

	useEffect(() => {
		// * get current date
		// * get days for the calendar
		// * get todos for the days

		const currentDate = calendarService.getCurrentDate();
		setDate(currentDate);
	}, [props]);

	useEffect(() => {
		const updateCalendar = async () => {
			if(Object.keys(date).length === 0) {
				return;
			}

			setIsLoading(true);
			const { year, month } = date;

			const currentDays = calendarService.getCalendarDays(year, month);
	
			const startDate = currentDays[0].date;
			const endDate = currentDays[currentDays.length - 1].date;
	
			const todosResponse = await todoService.getTodosForDates(
				startDate,
				endDate
			);
			if (!todosResponse.ok) {
				setIsLoading(false);
				setErrorMessages(todosResponse.errorMessages);
				return;
			}
	
			const dateTodos = todosResponse.data.todos;
			dateTodos.forEach((todo) => {
				const dayArr = currentDays.find((day) => day.date === todo.date);
	
				if (dayArr.todos.length < 3) {
					dayArr.todos.push(todo);
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
				const currentDate = currentDays.find((day) => day.date === dateMood.date);
				currentDate.moodColor = moodService.getMoodColor(dateMood.mood);
			});
	
			setIsLoading(false);
			setDays(currentDays);
		}

		updateCalendar();
	}, [date]);

	const updateDate = (year, month) => {
		const dateDay = date.day;

		setDate({
			year,
			month,
			day: dateDay
		});
	};

	if (errorMessages.length > 0) {
		return errorMessages.map((message, index) => {
			return <Alert alert="danger" message={message} key={index} />;
		});
	}

	if (isLoading) {
		return <Spinner />;
	}

	// display days
	const calendarRows = [];
	if (days.length !== 0) {
		let next = 0;
		for (let i = 0; i < 6; i++) {
			const currentRowDays = [];
			for (let j = 0; j < 7; j++) {
				currentRowDays.push(days[next++]);
			}

			calendarRows.push(
				<CalendarRow
					redirect={props.redirect}
					key={i}
					days={currentRowDays}
				/>
			);
		}
	}

	const sideBarDateObject = {
		year: date.year || 0,
		month: date.month || 0
	};

	return (
		<div>
			<SideBar date={sideBarDateObject} updateDate={updateDate} />
			<div className={classes.Calendar}>
				<CalendarHeaderRow />
				{calendarRows}
			</div>
		</div>
	);
}

export default Calendar;
