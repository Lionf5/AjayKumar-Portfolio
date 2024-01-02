import {
    addErrorToValidationDataAndKeepMessage
} from './validityUtils';
export const validateRangeOverflow = (props, validationData) => {
    const {
        max,
        value
    } = props;
    if (!max || !isFinite(max) || !value) {
        return validationData;
    }
    return Number(value) <= max ?
        validationData :
        addErrorToValidationDataAndKeepMessage(validationData, 'rangeOverflow');
};
//# sourceMappingURL=validateRangeOverflow.js.map