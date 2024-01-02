import {
    addErrorToValidationDataAndKeepMessage
} from './validityUtils';
const validUrlRegExp = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?/;
const isValidUrl = (value) => validUrlRegExp.test(value);
export const validateUrl = (props, validationData) => {
    const {
        value
    } = props;
    if (!value) {
        return validationData;
    }
    return isValidUrl(value) ?
        validationData :
        addErrorToValidationDataAndKeepMessage(validationData, 'typeMismatch');
};
//# sourceMappingURL=validateUrl.js.map