import {
    assert
} from '../assert';
import {
    addErrorToValidationDataAndKeepMessage
} from './validityUtils';
export const validateEmail = (props, validationData) => {
    const {
        value
    } = props;
    if (!value) {
        return validationData;
    }
    return assert.isEmail(value) ?
        validationData :
        addErrorToValidationDataAndKeepMessage(validationData, 'typeMismatch');
};
//# sourceMappingURL=validateEmail.js.map