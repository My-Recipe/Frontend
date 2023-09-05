import { ReactComponent as IconNavigateXs } from '@/assets/icon-navigate-xs.svg';
import DesignSystem from '@/utils/designSystem';

import { Group, Typography } from '@base';
import { css } from '@emotion/react';
import { HTMLAttributes } from 'react';

type ButtonType = 'icon' | 'outline' | 'none';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: ButtonType;
}

const layout = css({
  display: 'flex',
  padding: 14.5,
  justifyContent: 'center',
  alignItems: 'center',
  gap: 30,
});
const style = css({
  paddingRight: 29,
  paddingLeft: 29,
  borderRadius: 12,
  background: DesignSystem.Color.background.black,
});
const outline = css({
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 12,
  border: '2.4px solid #000',
  // padding: '0 14.5px',
});
function Button({ children, variant = 'none', ...props }: ButtonProps) {
  if (variant === 'icon')
    return (
      <button css={[layout, style]} {...props}>
        <Typography color="background.white" variant="button">
          {children}
        </Typography>
        <IconNavigateXs stroke="#fff" />
      </button>
    );

  if (variant === 'outline')
    return (
      <Group>
        <button css={[layout, style, { flex: 1 }]} {...props}>
          <Typography color="background.white" variant="button">
            {children}
          </Typography>
        </button>
        <button css={[layout, outline]}>
          <IconNavigateXs stroke="#000" />
        </button>
      </Group>
    );

  return (
    <button css={[layout, style]} {...props}>
      <Typography color="background.white" variant="button">
        {children}
      </Typography>
    </button>
  );
}

export default Button;
