import * as React from 'react';
import { ErrorSmall } from '@wix/wix-ui-icons-common/on-stage';
import {
  ErrorMessageType,
  ViewerTranslations,
} from '@wix/editor-elements-types/components';
import style from './style/inlineErrorMessage.scss';

export type InlineErrorMessageTranslationKeys = 'errorMessage';

interface InlineErrorMessageProps
  extends Partial<ViewerTranslations<InlineErrorMessageTranslationKeys>> {
  errorMessage?: string;
  errorMessageType: ErrorMessageType;
  shouldShowValidityIndication: boolean;
  componentViewMode?: string;
  dataHook?: string;
}

const errorMessageFallbackText = 'Error text displays here.';

export const InlineErrorMessage: React.FC<InlineErrorMessageProps> = ({
  errorMessage,
  errorMessageType,
  shouldShowValidityIndication,
  translations,
  dataHook,
  componentViewMode,
}) => {
  const getOnStageErrorText = () => {
    return translations?.errorMessage || errorMessageFallbackText;
  };

  const errorMessageText =
    componentViewMode === 'editor' ? getOnStageErrorText() : errorMessage;

  const hasInlineErrorMessage =
    errorMessageType === 'inline' &&
    shouldShowValidityIndication &&
    errorMessageText;

  return hasInlineErrorMessage ? (
    <div
      data-hook={dataHook ? dataHook : 'inline-error-message'}
      className={style.inlineErrorIndication}
    >
      <ErrorSmall className={style.iconErrorMessage} />
      <span className={style.txtErrMsg}>{errorMessageText}</span>
    </div>
  ) : null;
};
