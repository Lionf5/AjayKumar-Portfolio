import {
    DatePickerDate
} from '../DateTime';
import {
    convertDateRangesArray,
    convertDateStringToDate,
    isDateDisabled,
} from '../dateUtils';
import {
    addErrorToValidationDataAndKeepHtmlMessage
} from '.';
const getCurrentDatePickerValue = ({
    value: valueFromProps,
    useTodayAsDefaultValue,
    timeZone,
}) => {
    if (useTodayAsDefaultValue && !valueFromProps) {
        return new DatePickerDate({
            type: 'Now',
            timeZone: timeZone || 'Local',
        }).getAsDate('Local');
    }
    return typeof valueFromProps === 'string' ?
        convertDateStringToDate(valueFromProps) :
        valueFromProps;
};
export const validateEnabledDate = (props, validationData) => {
    const {
        timeZone,
        disabledDaysOfWeek,
        allowPastDates,
        allowFutureDates,
        useTodayAsDefaultValue,
    } = props;
    const value = getCurrentDatePickerValue({
        value: props.value,
        useTodayAsDefaultValue,
        timeZone,
    });
    if (!value) {
        return validationData;
    }
    const enabledDateRanges = props.enabledDateRanges ?
        convertDateRangesArray(props.enabledDateRanges, date => convertDateStringToDate(date)) :
        null;
    const disabledDateRanges = props.disabledDateRanges ?
        convertDateRangesArray(props.disabledDateRanges, date => convertDateStringToDate(date)) :
        null;
    const disabledDates = props.disabledDates ?
        props.disabledDates.map(date => convertDateStringToDate(date)) :
        null;
    const minDate = props.minDate ? convertDateStringToDate(props.minDate) : null;
    const maxDate = props.maxDate ? convertDateStringToDate(props.maxDate) : null;
    if (isDateDisabled(value, {
            enabledDateRanges,
            disabledDateRanges,
            disabledDates,
            minDate,
            maxDate,
            disabledDaysOfWeek,
            allowPastDates,
            allowFutureDates,
            timeZone,
        })) {
        return addErrorToValidationDataAndKeepHtmlMessage(validationData, 'invalidDate', {
            key: 'DATE_PICKER_INVALID_DATE',
        });
    }
    return validationData;
};
//# sourceMappingURL=validateEnabledDate.js.map