import { Children, ReactNode, isValidElement } from 'react';
import { DEFAULT_PROPS_PREFIX } from './constants';

export function getComponentFromType(children: ReactNode, type: string) {
  const childrenArray = Children.toArray(children);
  return childrenArray.filter(
    (child) =>
      isValidElement(child) &&
      (child.props[DEFAULT_PROPS_PREFIX] === type ||
        child.props['__EMOTION_TYPE_PLEASE_DO_NOT_USE__']?.defaultProps?.[
          DEFAULT_PROPS_PREFIX
        ] === type),
  );
}
