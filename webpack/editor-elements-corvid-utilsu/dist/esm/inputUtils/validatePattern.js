import {
    reportWarning
} from '../reporters';
import {
    addErrorToValidationDataAndKeepMessage
} from './validityUtils';
export const validatePattern = (props, validationData) => {
    const {
        pattern,
        value
    } = props;
    if (!pattern || !value) {
        return validationData;
    }
    let regExp;
    try {
        regExp = new RegExp(`^(?:${pattern})$`);
    } catch (e) {
        reportWarning(`invalid regex pattern '${pattern}'`);
        return validationData;
    }
    return regExp.test(value) ?
        validationData :
        addErrorToValidationDataAndKeepMessage(validationData, 'patternMismatch');
};
//# sourceMappingURL=validatePattern.js.map