import { Typography } from '@base';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

const checkBoxStyle = {
  wrapper: css({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 3,
    userSelect: 'none',
    cursor: 'pointer',
  }),
  check: {
    unChecked: css({
      width: 15,
      height: 15,
      borderRadius: 16,
      margin: 2,
      border: '2.4px solid var(--background-black)',
      background: 'var(--background-disabled)',
      boxSizing: 'border-box',
    }),
    checked: css({
      background: `var(--sub-pink)`,
    }),
  },
};

export interface CheckBoxProps {
  label: string;
  onCheckChanged?: (checked: boolean) => void;
  initialValue?: boolean;
}

function CheckBox({
  label,
  onCheckChanged,
  initialValue = false,
  ...props
}: CheckBoxProps) {
  const [checked, setChecked] = useState(initialValue);

  useEffect(() => {
    onCheckChanged && onCheckChanged(checked);
  }, [checked]);

  return (
    <div css={checkBoxStyle.wrapper} onClick={() => setChecked(!checked)}>
      <div
        css={[
          checkBoxStyle.check.unChecked,
          checked && checkBoxStyle.check.checked,
        ]}
      />
      <Typography variant="button" color="text.black">
        {label}
      </Typography>
    </div>
  );
}

export default CheckBox;
