import {
    addErrorToValidationDataAndKeepMessage
} from './validityUtils';
export const validateRequiredOptions = (props, validationData) => {
    const isRequired = props.required || false;
    if (!isRequired ||
        (props.options &&
            (!props.options.length || props.options.find(option => option.checked)))) {
        return validationData;
    }
    return addErrorToValidationDataAndKeepMessage(validationData, 'valueMissing');
};
//# sourceMappingURL=validateRequiredOptions.js.map