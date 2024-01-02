import {
  IPlatformData,
  withCompController,
} from '@wix/editor-elements-integrations';
import { getValidationControllerProps } from '@wix/editor-elements-common-utils';
import type {
  ITextAreaInputControllerProps,
  ITextAreaInputMapperProps,
  ITextAreaInputProps,
} from '../TextAreaInput.types';

const getComponentProps = ({
  mapperProps,
  controllerUtils,
}: IPlatformData<
  ITextAreaInputMapperProps,
  ITextAreaInputProps,
  any
>): ITextAreaInputControllerProps => {
  return {
    ...mapperProps,
    ...getValidationControllerProps(controllerUtils.updateProps),
  };
};

export default withCompController(getComponentProps);
