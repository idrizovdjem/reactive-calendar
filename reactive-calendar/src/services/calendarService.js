const dayjs = require('dayjs');
const weekday = require("dayjs/plugin/weekday");
const weekOfYear = require("dayjs/plugin/weekOfYear");

function getCalendarDays() {
    dayjs.extend(weekday);
    dayjs.extend(weekOfYear);

    const year = Number(dayjs().format("YYYY"));
    const month = Number(dayjs().format("M"));

    const result = {
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
        totalDays += (prevMonthDays - previousDifference);

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

    return result;
}

const calendarService = {
    getCalendarDays
};

export default calendarService;