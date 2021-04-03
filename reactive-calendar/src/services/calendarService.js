const dayjs = require('dayjs');
const weekday = require("dayjs/plugin/weekday");
const weekOfYear = require("dayjs/plugin/weekOfYear");

function getCalendarDays(year, month) {
    dayjs.extend(weekday);
    dayjs.extend(weekOfYear);

    const result = {
        year,
        month,
        current: {}
    }

    const currentDate = dayjs(`${year}/${month}/01`);
    let totalDays = currentDate.daysInMonth();

    result.current = {
        start: currentDate.day(),
        max: currentDate.daysInMonth(),
        active: dayjs().date()
    }

    if (result.current.start !== 1) {
        const prevDate = dayjs(`${year}/${month - 1}/01`);
        const prevMonthDays = prevDate.daysInMonth();
        const previousDifference = prevMonthDays - (result.current.start - 2);
        totalDays += (prevMonthDays - previousDifference) + 1;

        result.previous = {
            from: previousDifference,
            to: prevDate.daysInMonth()
        }
    }

    if (totalDays < 35) {
        result.next = {
            to: 35 - totalDays
        }
    }

    return transformToArray(result);
}

function transformToArray(dateObject) {
    const days = [];

    const { year, month } = dateObject;

    // * generate objects if there are previous month days
    if(dateObject.previous) {
        let previousYear, previousMonth;
        
        if(month === 1) {
            previousMonth = 12;
            previousYear = year - 1;
        } else {
            previousMonth = month - 1;
            if(previousMonth < 10) {
                previousMonth = `0${previousMonth}`;
            }
            previousYear = year;
        }

        for(let i = dateObject.previous.from; i <= dateObject.previous.to; i++) {
            days.push({
                date: `${previousYear}${previousMonth}${i}`,
                currentMonth: false,
                isActive: false,
                day: i
            });
        }
    }

    // * generate current month days
    let currentMonth = month;
    if(currentMonth < 10) {
        currentMonth = `0${month}`;
    }

    for(let i = 1; i <= dateObject.current.max; i++) {
        let currentDate = i;
        if(currentDate < 10) {
            currentDate = `0${currentDate}`;
        }

        const currentDateObject = {
            date: `${year}${currentMonth}${currentDate}`,
            currentMonth: true,
            isActive: false,
            day: i
        };

        if(i === dateObject.current.active) {
            currentDateObject.isActive = true;
        }

        days.push(currentDateObject);
    }

    // * generate objects if there are next month days
    if(dateObject.next) {
        let nextYear, nextMonth;
        if(month === 12) {
            nextMonth = 1;
            nextYear = year + 1;
        } else {
            nextMonth = month + 1;
            nextYear = year;
        }

        if(nextMonth < 10) {
            nextMonth = `0${nextMonth}`;
        }

        for(let i = 1; i <= dateObject.next.to; i++) {
            const currentDate = `0${i}`;
            const currentDateObject = {
                date: `${nextYear}${nextMonth}${currentDate}`,
                currentMonth: false,
                isActive: false,
                day: i
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

const calendarService = {
    getCalendarDays,
    getCurrentDate
};

export default calendarService;