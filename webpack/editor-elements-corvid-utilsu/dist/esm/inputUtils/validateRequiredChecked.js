import {
    addErrorToValidationDataAndKeepMessage
} from './validityUtils';
export const validateRequiredChecked = (props, validationData) => {
    const isRequired = props.required || false;
    if (!isRequired || props.checked) {
        return validationData;
    }
    return addErrorToValidationDataAndKeepMessage(validationData, 'valueMissing');
};
//# sourceMappingURL=validateRequiredChecked.js.map