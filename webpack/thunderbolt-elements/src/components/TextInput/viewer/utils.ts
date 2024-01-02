import { HtmlValidationMessageOverrideObject } from '@wix/editor-elements-corvid-utils';
import { ITextInputProps } from '../TextInput.types';
import { TranslationKeys } from './constants';

export const formatPhoneNumber = (
  unformattedValue: string,
  phoneFormat: string,
) => {
  const spaceInfo = getSpaceIndexesForPhoneFormat(
    unformattedValue,
    phoneFormat,
    false,
  );
  const newValueAsArray = Array.from(unformattedValue);

  spaceInfo.forEach(spaceIdx => {
    if (spaceIdx < newValueAsArray.length) {
      newValueAsArray.splice(spaceIdx, 0, ' ');
    }
  });

  return newValueAsArray.join('');
};

const getSpaceIndexesForPhoneFormat = (
  val: string,
  phoneFormat: string,
  isValueFormatted = true,
) => {
  const updatedSpaceInfo = Array.from(phoneFormat)
    .reduce((agg: Array<number>, curr, idx) => {
      return curr === '-' ? [...agg, idx] : agg;
    }, [])
    .filter((spaceIdx, index) => {
      return isValueFormatted
        ? spaceIdx <= val.length
        : spaceIdx <= val.length + index;
    });

  return updatedSpaceInfo;
};

export const getUnformattedNumber = (
  val: string,
  phoneFormat: string,
  didDeleteChars: boolean,
) => {
  const updatedSpaceInfo = getSpaceIndexesForPhoneFormat(val, phoneFormat);

  return updatedSpaceInfo
    .reduce((agg, curr, idx) => {
      if (val[curr] === ' ') {
        agg.splice(curr - idx, 1);
      } else if (val[curr + 1] === ' ' && !didDeleteChars) {
        const offset = 1 - idx;

        agg.splice(curr + offset, 1);
      } else if (val[curr - 1] === ' ' && didDeleteChars) {
        const didDeleteSpace =
          val.split(' ').length - 1 < updatedSpaceInfo.length;

        if (didDeleteSpace) {
          agg.splice(curr - idx, 1);
        } else {
          agg.splice(curr - idx - 1, 1);
        }
      }

      return agg;
    }, Array.from(val))
    .join('');
};

export const hasNonNumericChar = (str: string) => !!str.match(/[^\d]/);

export const translateHtmlValidationMessage = (
  message: HtmlValidationMessageOverrideObject,
  {
    translations,
    phoneFormat,
  }: { translations: ITextInputProps['translations']; phoneFormat?: string },
): string => {
  switch (message.key) {
    case 'PHONE_FORMAT_LENGTH_VALIDATION_ERROR':
      return getPhoneFormatLengthValidationError(
        phoneFormat,
        translations?.phoneFormatLengthValidationError ||
          TranslationKeys.PHONE_FORMAT_LENGTH_VALIDATION_ERROR_DEFAULT,
      );

    case 'PHONE_FORMAT_DEFAULT_VALIDATION_ERROR':
      return (
        translations?.phoneFormatDefaultValidationError ||
        TranslationKeys.PHONE_FORMAT_DEFAULT_VALIDATION_ERROR_DEFAULT
      );

    case 'PHONE_FORMAT_COMPLEX_PHONE_DEFAULT_VALIDATION_ERROR':
      return (
        translations?.phoneFormatComplexPhoneDefaultValidationError ||
        TranslationKeys.PHONE_FORMAT_COMPLEX_PHONE_DEFAULT_VALIDATION_ERROR_DEFAULT
      );

    default:
      return message.key;
  }
};

const getPhoneFormatLengthValidationError = (
  phoneFormat: string | undefined,
  phoneFormatLengthValidationError: string,
): string =>
  phoneFormatLengthValidationError.replace(
    '{digits}',
    `${phoneFormat ? phoneFormat.replace(/-/g, '').length : 0}`,
  );
