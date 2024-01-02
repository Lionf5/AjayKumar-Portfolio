import * as React from 'react';
import classnames from 'clsx';
import { customCssClasses } from '@wix/editor-elements-common-utils';
import semanticClassNames from '../../Container.semanticClassNames';
import {
  ISkinableContainerProps,
  IContainerImperativeActions,
} from '../../Container.types';
import { ContainerLogic } from './ContainerLogic';
import { TestIds } from './constants';

/** This is a shared dom structure for similar skins */
const BasicContainerComp: React.ForwardRefRenderFunction<
  IContainerImperativeActions,
  ISkinableContainerProps
> = ({ classes, className, customClassNames = [], ...rest }, ref) => {
  return (
    <ContainerLogic
      {...rest}
      ref={ref}
      className={classnames(classes.root, className)}
      renderSlot={({ containerChildren }) => (
        <>
          <div
            className={classnames(
              classes.bg,
              customCssClasses(...customClassNames, semanticClassNames.root),
            )}
            data-testid={TestIds.BG}
          />
          {containerChildren}
        </>
      )}
    />
  );
};

export const BasicContainer = React.forwardRef(BasicContainerComp);
