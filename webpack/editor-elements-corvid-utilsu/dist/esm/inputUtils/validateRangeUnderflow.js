import {
    addErrorToValidationDataAndKeepMessage
} from './validityUtils';
export const validateRangeUnderflow = (props, validationData) => {
    const {
        min,
        value
    } = props;
    if (!min || !isFinite(min) || !value) {
        return validationData;
    }
    return Number(value) >= min ?
        validationData :
        addErrorToValidationDataAndKeepMessage(validationData, 'rangeUnderflow');
};
//# sourceMappingURL=validateRangeUnderflow.js.map