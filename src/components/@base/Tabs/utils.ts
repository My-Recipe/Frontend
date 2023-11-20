import { Children, ReactNode, isValidElement } from 'react';
export const DEFAULT_PROPS_PREFIX = '_type';

export function getComponentFromType(children: ReactNode, type: string) {
  const childrenArray = Children.toArray(children);
  return childrenArray.filter(
    (child) =>
      isValidElement(child) &&
      (child.props[DEFAULT_PROPS_PREFIX] === type ||
        //emotion 자체 defaultProps 추가로 인해 1depth 더 검사
        child.props['__EMOTION_TYPE_PLEASE_DO_NOT_USE__']?.defaultProps?.[
          DEFAULT_PROPS_PREFIX
        ] === type),
  );
}
