import {
    addErrorToValidationDataAndKeepMessage
} from './validityUtils';
export const validateRequired = (props, validationData) => {
    const isRequired = props.required || false;
    if (!isRequired || props.value) {
        return validationData;
    }
    return addErrorToValidationDataAndKeepMessage(validationData, 'valueMissing');
};
//# sourceMappingURL=validateRequired.js.map