import {
  Children,
  MutableRefObject,
  ReactNode,
  RefCallback,
  isValidElement,
} from 'react';
import { DEFAULT_PROPS_PREFIX } from './constants';

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

export function mergeRef<T>(
  ...refs: Array<MutableRefObject<T> | RefCallback<T>>
) {
  return (element: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(element);
      } else {
        ref.current = element;
      }
    });
  };
}
