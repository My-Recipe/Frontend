/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefObject, useEffect, useMemo, useRef, useState } from 'react';

type ObserverRect = Omit<DOMRectReadOnly, 'toJSON'>;

const defaultState: ObserverRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

export function useResizeObserver<T extends HTMLElement = any>() {
  const frameID = useRef(0);
  const ref = useRef<T>(null);

  const [rect, setRect] = useState<ObserverRect>(defaultState);

  const observer = useMemo(
    () =>
      typeof window !== 'undefined'
        ? new ResizeObserver((entries: any) => {
            const entry = entries[0];

            if (entry) {
              cancelAnimationFrame(frameID.current);

              frameID.current = requestAnimationFrame(() => {
                if (ref.current) {
                  setRect(entry.contentRect);
                }
              });
            }
          })
        : null,
    [],
  );

  useEffect(() => {
    if (ref.current) {
      observer?.observe(ref.current);
    }

    return () => {
      observer?.disconnect();

      if (frameID.current) {
        cancelAnimationFrame(frameID.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  return [ref, rect] as const;
}

export function useElementSize<T extends HTMLElement = any>() {
  const [ref, { width, height }] = useResizeObserver<T>();
  return { ref, width, height };
}

type IntervalFunction = () => unknown | void;

export function useInterval(callback: IntervalFunction, delay: number) {
  const savedCallback = useRef<IntervalFunction | null>(null);
  const [clearTrigger, setClearTrigger] = useState(false);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback.current !== null) {
        savedCallback.current();
      }
    }
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay, clearTrigger]);
  return () => setClearTrigger(!clearTrigger);
}

/**
 * 대상 ref를 제외한 바깥쪽 클릭이벤트를 감지해주는 hooks 입니다.
 * @param handler - outside click시 실행되는 callback 함수
 * @param preventClickRefs - click 이벤트에서 제외할 ref / refs
 * @returns 기준이 되는 ref
 */
export function useClickOutside<T extends HTMLElement>(
  handler: () => void,
  preventClickRefs?: RefObject<HTMLElement>[] | RefObject<HTMLElement>,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const element = e.target;

      if (element instanceof Node && preventClickRefs) {
        if (Array.isArray(preventClickRefs)) {
          for (const ref of preventClickRefs) {
            if (ref.current?.contains(element)) return;
          }
        } else if (preventClickRefs.current?.contains(element)) {
          return;
        }
      }

      if (
        element instanceof Node &&
        ref.current &&
        !ref.current.contains(element)
      ) {
        handler();
      }
    };

    document.addEventListener('click', listener);
    return () => document.removeEventListener('click', listener);
  }, [ref, handler, preventClickRefs]);

  return ref;
}

export function useUserData<T extends object = { mail: string }>() {
  const localUserData = localStorage.getItem('user-data');

  const [userDataState, setUserDataState] = useState<T | null>(
    localUserData && localUserData !== 'undefined' && JSON.parse(localUserData),
  );

  const setUserData = (userData: T | null) => {
    setUserDataState(userData);
  };

  useEffect(() => {
    if (userDataState)
      localStorage.setItem('user-data', JSON.stringify(userDataState));
    else localStorage.removeItem('user-data');
  }, [userDataState]);

  return [userDataState, setUserData] as const;
}

export function useComposing() {
  const [isComposing, setIsComposing] = useState(false);

  const onCompositionStart = () => setIsComposing(true);
  const onCompositionEnd = () => setIsComposing(false);

  return [isComposing, { onCompositionStart, onCompositionEnd }] as const;
}
