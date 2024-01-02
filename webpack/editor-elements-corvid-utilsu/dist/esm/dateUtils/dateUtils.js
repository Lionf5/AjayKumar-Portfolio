import {
    assert
} from '../assert';
const cloneDate = (date) => new Date(date);
export const getStartOfDay = (date) => {
    const newDate = cloneDate(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
};
export const areDatesEqual = (date1, date2) => getStartOfDay(date1).getTime() === getStartOfDay(date2).getTime();
export const getGridOfDaysInMonth = (year, month, weekStartDay) => {
    const firstDayInMonth = new Date(year, month);
    const lastDayInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayInMonthWeekDay = firstDayInMonth.getDay();
    // We need to shift the days in the first week of the month relative to the starting day of the week. For example:
    // 1st of month is Tuesday and the week starts with Sunday (no shift):
    // [undefined, undefined, 1, 2, 3, 4, 5]
    // 1st of month is Tuesday and the week starts with Monday (shift by one):
    // [undefined, 1, 2, 3, 4, 5, 6]
    // 1st of month is Monday and the week starts with Tuesday (Monday is the last day of the week):
    // [undefined, undefined, undefined, undefined, undefined, undefined, 1]
    // 1st of month is Tuesday and the week starts with Tuesday (shift by two):
    // [1, 2, 3, 4, 5, 6, 7]
    const shiftedFirstDayInMonthWeekDay = firstDayInMonthWeekDay -
        weekStartDay +
        (firstDayInMonthWeekDay < weekStartDay ? 7 : 0);
    const daysInFirstWeek = 7 - shiftedFirstDayInMonthWeekDay;
    const firstWeek = [
        ...Array(shiftedFirstDayInMonthWeekDay),
        ...Array(daysInFirstWeek)
        .fill(0)
        .map((_, index) => index + 1),
    ];
    const weeks = [firstWeek];
    const addWeek = (traversedDaysInMonth) => {
        const remainingDaysInMonth = lastDayInMonth - traversedDaysInMonth;
        if (remainingDaysInMonth > 7) {
            const week = Array(7)
                .fill(0)
                .map((_, index) => traversedDaysInMonth + index + 1);
            weeks.push(week);
            addWeek(traversedDaysInMonth + 7);
        } else {
            const week = [
                ...Array(remainingDaysInMonth)
                .fill(0)
                .map((_, index) => traversedDaysInMonth + index + 1),
                ...Array(7 - remainingDaysInMonth),
            ];
            weeks.push(week);
        }
    };
    addWeek(daysInFirstWeek);
    return weeks;
};
const isDisabledByEnabledDateRanges = ({
    enabledDateRanges,
    date,
}) => {
    for (const {
            startDate,
            endDate
        } of enabledDateRanges) {
        if (startDate <= date && date <= endDate) {
            return false;
        }
    }
    return true;
};
export const getDisabledGrid = (daysGrid, mapCallback) => {
    return daysGrid.map(week => week.map(mapCallback));
};
export const getDisabledGridWithDisabledDays = (daysGrid, disabledDays) => getDisabledGrid(daysGrid, day => day && disabledDays.includes(day) ? '' : null);
export const getDisabledGridWithToday = (daysGrid, today) => getDisabledGrid(daysGrid, day => (day && day !== today ? '' : null));
export const getDisabledGridWithMinMax = (daysGrid, minDay, maxDay) => getDisabledGrid(daysGrid, day => day && (day < minDay || day > maxDay) ? '' : null);
export const getDisabledGridWithDayOfWeek = (daysGrid, year, month, disabledDaysOfWeek) => getDisabledGrid(daysGrid, day => {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
    return day && disabledDaysOfWeek.includes(dayOfWeek) ? '' : null;
});
export const getDisabledGridWithPastDays = (daysGrid, day) => getDisabledGrid(daysGrid, weekDay => (weekDay && weekDay < day ? '' : null));
export const getDisabledGridWithFutureDays = (daysGrid, day) => getDisabledGrid(daysGrid, weekDay => (weekDay && weekDay > day ? '' : null));
const isDisabledByDisabledDateRanges = ({
    disabledDateRanges,
    date,
}) => {
    for (const {
            startDate,
            endDate
        } of disabledDateRanges) {
        if (startDate <= date && date <= endDate) {
            return true;
        }
    }
    return false;
};
const isDisabledByDisabledDates = ({
    disabledDates,
    date,
}) => disabledDates.some(disabledDate => areDatesEqual(disabledDate, date));
const isDisabledByDisabledDaysOfWeek = ({
    disabledDaysOfWeek,
    dayOfWeek,
}) => disabledDaysOfWeek.some(disabledDay => disabledDay === dayOfWeek);
export const isDateDisabled = (date, {
    timeZone,
    dayOfWeek,
    todayDate,
    enabledDateRanges,
    disabledDateRanges,
    disabledDates,
    disabledDaysOfWeek,
    minDate,
    maxDate,
    allowPastDates,
    allowFutureDates,
}) => {
    if (!assert.isNil(enabledDateRanges) &&
        isDisabledByEnabledDateRanges({
            date,
            enabledDateRanges
        })) {
        return true;
    }
    if (!assert.isNil(disabledDateRanges) &&
        isDisabledByDisabledDateRanges({
            date,
            disabledDateRanges
        })) {
        return true;
    }
    if (!assert.isNil(disabledDates) &&
        isDisabledByDisabledDates({
            date,
            disabledDates
        })) {
        return true;
    }
    if (!assert.isNil(minDate) && date < new Date(minDate)) {
        return true;
    }
    if (!assert.isNil(maxDate) && date > new Date(maxDate)) {
        return true;
    }
    if (!assert.isNil(allowPastDates) || !assert.isNil(allowFutureDates)) {
        if (assert.isNil(todayDate)) {
            todayDate = timeZone ?
                new Date(new Date(Date.now()).toLocaleDateString('en-US', {
                    timeZone
                })) :
                new Date(Date.now());
        }
        todayDate = getStartOfDay(todayDate);
        if (!assert.isNil(allowPastDates) && !allowPastDates && date < todayDate) {
            return true;
        }
        if (!assert.isNil(allowFutureDates) &&
            !allowFutureDates &&
            date > todayDate) {
            return true;
        }
    }
    if (disabledDaysOfWeek) {
        dayOfWeek = !assert.isNil(dayOfWeek) ? dayOfWeek : date.getDay();
        if (isDisabledByDisabledDaysOfWeek({
                dayOfWeek,
                disabledDaysOfWeek
            })) {
            return true;
        }
    }
    return false;
};
export const convertDateRangesArray = (dateRanges, converter) => dateRanges.map(({
    startDate,
    endDate
}) => ({
    startDate: converter(startDate),
    endDate: converter(endDate),
}));
export const convertDateStringToDate = (dateStr) => getStartOfDay(new Date(dateStr));
//# sourceMappingURL=dateUtils.js.map