import { ComboBoxInputOption } from '@wix/thunderbolt-components';
import { TextAlignment } from '@wix/editor-elements-definitions';
import { CompInfo } from '@wix/editor-elements-types/thunderbolt';
import {
  getScaledFont,
  getInputHeight,
  getRequiredIndicationDisplay,
} from '@wix/editor-elements-common-utils';
import {
  ComboBoxInputNavigationBorderVars,
  ComboBoxInputNavigationCSSVars,
} from './ComboBoxInput.types';

export const isOptionWithSelectedText = (
  options: Array<ComboBoxInputOption>,
  optionValue: string,
) => {
  const selectedText = options.find(
    option => option.value === optionValue,
  )?.selectedText;

  return selectedText !== null && selectedText !== undefined;
};

export const noop = () => {};

export const calculateElemWidth = (elem: HTMLElement) =>
  elem.getBoundingClientRect().width;

export const filterOptionsByQuery = (
  filterQuery: string,
  options: Array<ComboBoxInputOption>,
) => {
  return options
    .filter(option =>
      option.text.toLowerCase().includes(filterQuery.toLowerCase()),
    )
    .sort((prev, next) => {
      if (prev.text.toLowerCase().startsWith(filterQuery.toLowerCase())) {
        return -1;
      }
      if (next.text.toLowerCase().startsWith(filterQuery.toLowerCase())) {
        return 1;
      }
      return 0;
    });
};

export const optionsMapper = (options: Array<ComboBoxInputOption>) => {
  return options.map((option: ComboBoxInputOption) => ({
    label: option.text,
    value: option.value,
  }));
};

export const getComboBoxInputNavigationCSSVars = (
  {
    compProps,
    compSingleLayout,
    styleProperties,
    compLayout,
    isMobileView,
    siteFonts,
  }: Pick<
    CompInfo,
    | 'compProps'
    | 'styleProperties'
    | 'compLayout'
    | 'isMobileView'
    | 'siteFonts'
  > &
    Partial<Pick<CompInfo, 'compSingleLayout'>>,
  alignText: TextAlignment,
  borders: ComboBoxInputNavigationBorderVars,
): ComboBoxInputNavigationCSSVars => {
  const isRightAligned = alignText === 'right';

  return {
    '--direction': isRightAligned ? 'rtl' : 'ltr',
    '--arrowInsetInlineStart': 'auto',
    '--arrowInsetInlineEnd': '0',
    '--align': alignText,
    '--textPaddingInput_start': `20px`,
    '--textPaddingInput_end': `45px`,
    '--fnt': getScaledFont(
      { styleProperties, compLayout, compProps, isMobileView, siteFonts },
      'fnt',
    ),
    '--inputHeight': getInputHeight({
      inputHeightProps: compProps,
      compLayout,
      compSingleLayout,
      isMobileView,
    }),
    '--requiredIndicationDisplay':
      getRequiredIndicationDisplay(styleProperties),
    '--borderColor': 'rgba(0, 0, 0, 0.2)',
    ...borders,
  };
};
