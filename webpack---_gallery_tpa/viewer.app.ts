import {
  CommonViewerScript,
  ViewerScriptContext,
} from '@wix/common-pro-gallery-worker-wrapper';
import { InitAppForPageFn } from '@wix/yoshi-flow-editor';
import { PRO_GALLERY } from './types/constants';

const context = new ViewerScriptContext(PRO_GALLERY.SENTRY_DSN);
export const initAppForPage: InitAppForPageFn = async (
  initParams,
  platformApis,
  wixCodeApi,
  platformServicesApis,
  flowAPI,
) => {
  CommonViewerScript.getInitAppForPageFunc(context)(
    initParams,
    platformApis,
    wixCodeApi,
    platformServicesApis,
  );

  // @ts-expect-error
  context.context.msid = flowAPI?.bi?._defaults?._msid;
  return { context };
};
