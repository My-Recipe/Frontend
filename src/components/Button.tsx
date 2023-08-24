import IconNavigateXs from '@/assets/icon-navigate-xs.svg';
import { Color } from '@/utils/designSystem';
import { Group } from '@base';
import Typography from '@base/Typography';
import { css } from '@emotion/react';
import { HTMLAttributes } from 'react';

type ButtonType = 'icon' | 'outline' | 'none';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: ButtonType;
}

const layout = css({
  display: 'flex',
  padding: '14.5px 29px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 30,
});
const style = css({
  borderRadius: 12,
  background: Color.background.black,
});
const outline = css({
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 12,
  border: '2.4px solid #000',
});
function Button({ children, variant = 'none', ...props }: ButtonProps) {
  if (variant === 'icon')
    return (
      <button css={[layout, style]} {...props}>
        <Typography color="background.white" variant="button">
          {children}
        </Typography>
        <img src={IconNavigateXs} />
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
          <img src={IconNavigateXs} />
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
