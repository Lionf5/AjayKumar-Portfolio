import React, { FC } from 'react';
import {
  useExperiments,
  useTranslation,
  WidgetProps,
} from '@wix/yoshi-flow-editor';
import { useSettings, useStyles, withStyles } from '@wix/tpa-settings/react';
import { Button } from 'wix-ui-tpa';
import settingsParams from '../settingsParams';
import { st, classes } from './Widget.st.css';
import GalleryWrapper from './GalleryWrapper/GalleryWrapper';
import { flattenObject, optionsMap } from 'pro-gallery-lib';

export type ControllerProps = {
  items: any;
  // Here, props passed via controller's `setProps` should be defined.
};

const Widget: FC<WidgetProps<ControllerProps>> = (props) => {
  // const settings = useSettings();
  // const { experiments } = useExperiments();
  // const styles = useStyles();
  // const { t } = useTranslation();
  // console.log({ styles });

  return <GalleryWrapper {...props} />;
};
export default Widget;

// export default Widget;
