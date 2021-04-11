const dayjs = require('dayjs');
const weekday = require("dayjs/plugin/weekday");
const weekOfYear = require("dayjs/plugin/weekOfYear");

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

function getCalendarDays(year, month) {
    // get the current month days
    // previous month last days and next month start days

    const result = {
        year,
        month,
        current: {}
    }

    // get the total days in the current month
    const currentDate = dayjs(`${year}/${month}/01`);
    let totalDays = currentDate.daysInMonth();

    result.current = {
        start: currentDate.day(),
        max: currentDate.daysInMonth(),
        active: dayjs().date()
    }

    if (result.current.start === 0) {
        // if the start day is sunday
        // change the number, so the calendar works correctly
        result.current.start = 7;
    }

    if (result.current.start !== 1) {
        // check if the current month does not start in monday
        // calculate how many days should the function take from
        // the previous month
        // * example (current month starts in Wednesday)
        // * then the function takes the last two days from 
        // * the previous day

        // take the total days in the previous month
        const prevDate = dayjs(`${year}/${month - 1}/01`);
        const prevMonthDays = prevDate.daysInMonth();
        // calculate the difference
        const previousDifference = prevMonthDays - (result.current.start - 2);
        totalDays += (prevMonthDays - previousDifference) + 1;

        result.previous = {
            from: previousDifference,
            to: prevDate.daysInMonth()
        }
    }

    if (totalDays < 42) {
        // check if the total days to this moment (current month days + previous month days) is less than 42
        // ? 42 => (the calendar has 6 rows with 7 days)
        // calculate how many days should be taken from next month
        result.next = {
            to: 42 - totalDays
        }
    }

    // ? example of the current result
    /* 
        result = {
            current: {
                start: 4, // ? (number between 1 and 7 (1-Mon, 7-Sun))
                max: 30, // ? max days the current month has
                active: 5 // ? the current date
            },
            previous: {
                from: 29, // ? start date from previous month
                to: 31 // ? end date from previous month
            },
            next: {
                to: 9 // ? end date of next month
            },
            month: 4, // ? current month
            year: 2021 // ? current year
        }
    */

    // return the result object transformed to dates array
    return transformToArray(result);
}

function transformToArray(dateObject) {
    // transforms dateObject to dates array
    const days = [];

    // get the current year and month and convert them to numbers
    let { year, month } = dateObject;
    year = Number(year);
    month = Number(month);

    // * generate objects if there are previous month days
    if (dateObject.previous) {
        let previousYear, previousMonth;

        // get the previous month and year
        if (month === 1) {
            previousMonth = 12;
            previousYear = year - 1;
        } else {
            previousMonth = month - 1;
            if (previousMonth < 10) {
                previousMonth = `0${previousMonth}`;
            }
            previousYear = year;
        }

        // generate the previous month dates
        for (let i = dateObject.previous.from; i <= dateObject.previous.to; i++) {
            days.push({
                date: parseInt(`${previousYear}${previousMonth}${i}`),
                currentMonth: false,
                isActive: false,
                day: i,
                todos: []
            });
        }
    }

    // * generate current month days
    let currentMonth = month;
    if (currentMonth < 10) {
        currentMonth = `0${month}`;
    }

    for (let i = 1; i <= dateObject.current.max; i++) {
        // generate current month dates

        let currentDate = i;
        if (currentDate < 10) {
            currentDate = `0${currentDate}`;
        }

        const currentDateObject = {
            date: parseInt(`${year}${currentMonth}${currentDate}`),
            currentMonth: true,
            isActive: false,
            day: i,
            todos: []
        };

        // set the active flag to the current date
        if (i === dateObject.current.active) {
            currentDateObject.isActive = true;
        }

        days.push(currentDateObject);
    }

    // * generate objects if there are next month days
    if (dateObject.next) {
        // generate next month dates

        // calculate next month and year
        let nextYear, nextMonth;
        if (month === 12) {
            nextMonth = 1;
            nextYear = year + 1;
        } else {
            nextMonth = month + 1;
            nextYear = year;
        }

        if (nextMonth < 10) {
            nextMonth = `0${nextMonth}`;
        }

        for (let i = 1; i <= dateObject.next.to; i++) {
            // generate next month dates
            const currentDate = `0${i}`;
            const currentDateObject = {
                date: parseInt(`${nextYear}${nextMonth}${currentDate}`),
                currentMonth: false,
                isActive: false,
                day: i,
                todos: []
            };

            days.push(currentDateObject);
        }
    }

    return days;
}

function getCurrentDate() {
    const year = dayjs().format('YYYY');
    const month = dayjs().format('M');
    const day = dayjs().format('D');

    return {
        year,
        month,
        day
    }
}

function getMonthRange(year, month) {
    const monthDays = getCalendarDays(year, month);

    return {
        from: monthDays[0].date,
        to: monthDays[monthDays.length - 1].date
    };
}

function getCurrentYear() {
    return dayjs().format('YYYY');
}

function getMonthData(year, month) {
    const currentDate = dayjs(`${year}/${month}/01`);
    let totalDays = currentDate.daysInMonth();
    let convertedMonth = month < 10 ? `0${month}` : month;

    const from = parseInt(`${year}${convertedMonth}0${1}`);
    const to = parseInt(`${year}${convertedMonth}${totalDays}`);

    return {
        from,
        to
    };
}

function convertFromNumber(date) {
    // get date as number (20210405) and returns '2021/04/05'

    const stringDate = date.toString();
    const year = stringDate.substr(0, 4);
    const month = stringDate.substr(4, 2);
    const day = stringDate.substr(6, 2);

    return `${year}/${month}/${day}`;
}

const calendarService = {
    convertFromNumber,
    getCalendarDays,
    getCurrentDate,
    getCurrentYear,
    getMonthRange,
    getMonthData
};

export default calendarService;