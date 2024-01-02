import {
    addCustomValidityToValidationData,
    checkCustomValidity,
} from './validityUtils';
import {
    getCustomValidator
} from './validationPropsSdkState';
export const createInputValidator = (componentValidator, compValueGetter) => {
    const callbacks = [];
    return {
        onValidate: cb => callbacks.push(cb),
        validate: ({
            viewerSdkAPI,
            showValidityIndication
        }) => {
            const {
                props,
                metaData: {
                    isRepeaterTemplate
                },
            } = viewerSdkAPI;
            // We don't want to validate on a repeater template
            // since the validation will use the template props
            if (isRepeaterTemplate) {
                return;
            }
            const validationDataResult = componentValidator(props, viewerSdkAPI);
            let updatedValidationData = validationDataResult;
            const customValidityMessage = checkCustomValidity(getCustomValidator(viewerSdkAPI), props, compValueGetter);
            if (customValidityMessage) {
                updatedValidationData = addCustomValidityToValidationData(validationDataResult, customValidityMessage);
            }
            callbacks.forEach((cb) => cb({
                viewerSdkAPI,
                showValidityIndication,
                validationDataResult: updatedValidationData,
            }));
        },
    };
};
export const createEmptyInputValidator = () => {
    return {
        onValidate: (_cb) => {},
        validate: (_args) => {},
    };
};
//# sourceMappingURL=createInputValidator.js.map