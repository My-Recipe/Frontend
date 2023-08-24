import { css } from '@emotion/react';
import { CSSProperties } from 'react';

export type ColorVariantType = 'background' | 'text' | 'primary' | 'sub';
export type ShortColorType = `${ColorVariantType}.${string}`;
export const Color: {
  [key in ColorVariantType]: { [color: string]: string };
} = {
  background: {
    white: '#FFFFFF',
    gray: '#F6F7F8',
    black: '#141414',
    disabled: '#E4E6EA',
  },
  text: {
    gray: '#9EA6B1',
    black: '#292929',
    red: '#FB4747',
  },
  primary: {
    yellow: '#FFE24C',
    yellow_hover: '#FCC252',
    green: '#4BC25E',
  },
  sub: {
    brown: '#B1976D',
    pink: '#FF85CE',
    blue: '#B6D5E6',
  },
};
export const colorGenerator = (value: string) => {
  const prefix: string | ColorVariantType = value.split('.')[0] || '';
  const colorValue = value.split('.')[1] || '';
  return prefix in Color
    ? Color[prefix as ColorVariantType][colorValue]
    : value;
};

export const Shadow: CSSProperties['boxShadow'] =
  '0px 4px 16px 0px rgba(140, 140, 140, 0.13)';

const color = Color.text.black;
export const TextStyle = {
  display: css({
    color,
    fontFamily: 'ChosunSm',
    fontSize: 42,
    fontStyle: 'normal',
    fontWeight: 400,
  }),
  headline: css({
    color,
    fontFamily: 'Pretendard',
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: 500,
  }),
  subtitle: css({
    color,
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: 'normal',
  }),
  body: css({
    color,
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: 400,
  }),
  button: css({
    color,
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 500,
  }),
  info: css({
    color,
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 400,
  }),
};
export type TextType = keyof typeof TextStyle;
