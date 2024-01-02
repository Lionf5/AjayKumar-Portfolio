import * as React from 'react';
import {
  IContainerProps,
  IContainerImperativeActions,
} from '../../../Container.types';
import { BasicContainer } from '../../shared/BasicContainer';
import styles from './CircleArea.scss';

const CircleArea: React.ForwardRefRenderFunction<
  IContainerImperativeActions,
  IContainerProps
> = (props, ref) => {
  return <BasicContainer ref={ref} {...props} classes={styles} />;
};

export default React.forwardRef(CircleArea);
