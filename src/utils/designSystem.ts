import { css } from '@emotion/react';
import { CSSProperties } from 'react';
export type ColorVariantType =
  | 'background'
  | 'text'
  | 'warning'
  | 'secondary'
  | 'primary'
  | 'sub';
type ColorDetailType =
  | 'white'
  | 'gray'
  | 'black'
  | 'disabled'
  | 'gray'
  | 'black'
  | 'red'
  | 'yellow'
  | 'yellow-hover'
  | 'green'
  | 'brown'
  | 'pink'
  | 'blue';
export type ShortColorType = `${ColorVariantType}.${string}`;
export const Color: {
  [key in ColorVariantType]: { [color in ColorDetailType]?: string };
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
  },
  warning: {
    red: '#FB4747',
  },
  primary: {
    yellow: '#FFE24C',
    'yellow-hover': '#FCC252',
  },
  secondary: {
    green: '#4BC25E',
  },
  sub: {
    brown: '#B1976D',
    pink: '#FF85CE',
    blue: '#B6D5E6',
  },
};

export const colorGenerator = (value: string) => {
  const splitValue = value.split('.');
  if (splitValue[0] in Color && splitValue[0] && splitValue[1]) {
    const prefix: ColorVariantType = splitValue[0] as ColorVariantType;
    const postfix = splitValue[1];
    if (postfix in Color[prefix])
      return Color[prefix][postfix as ColorDetailType];
    return value;
  }
  return value;
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
