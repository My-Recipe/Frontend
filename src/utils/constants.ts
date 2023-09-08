import DesignSystem from './designSystem';

export const DEFAULT_PROPS_PREFIX = '_type';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getObjectKeys(obj: any, parentKey = ''): string[] {
  return Object.keys(obj).flatMap((key) => {
    const fullKey = parentKey ? `${parentKey}.${key}` : key;
    return typeof obj[key] === 'object'
      ? getObjectKeys(obj[key], fullKey)
      : fullKey;
  });
}

export const COLOR_VARIANT_TEXT = getObjectKeys(DesignSystem.Color);
