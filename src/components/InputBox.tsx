import { ReactComponent as IconSearchXs } from '@/assets/icon-search-xs.svg';
import { ReactComponent as IconSearch } from '@/assets/icon-search.svg';
import DesignSystem from '@/utils/designSystem';
import { Group, Popover, Stack, Typography } from '@base';
import { css } from '@emotion/react';
import hangul from 'hangul-js';
import { CSSProperties, HTMLAttributes, ReactNode } from 'react';

export interface InputBoxProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  searchItems?: string[];
  value: string;
  onChange: (value: string) => void;
  onItemClick?: (value: string, index: number) => void;
  placeholder?: string;
  width?: CSSProperties['width'];
  tags?: ReactNode;
}

const triggerStyle = {
  wrapper: css({
    padding: '16px 26px',
    backgroundColor: DesignSystem.Color.background.white,
    borderRadius: 4,
    border: `1px solid var(--text-gray, ${DesignSystem.Color.text.gray})`,
  }),
  group: css({
    alignContent: 'center',
    height: 33,
    flexWrap: 'nowrap',
  }),
  input: css({
    color: DesignSystem.Color.text.black,
    flex: 1,
    height: '100%',
    padding: 0,
  }),
};

const contentStyle = {
  wrapper: css({
    boxShadow: DesignSystem.Shadow,
  }),
  stack: css({
    padding: '24px 32px',
    borderRadius: 4,
    background: DesignSystem.Color.background.white,
  }),
  item: css({
    userSelect: 'none',
    cursor: 'pointer',
  }),
  text: css({
    padding: 10,
  }),
};

function InputBox({
  value: inputValue,
  onChange,
  onItemClick,
  searchItems,
  placeholder = '#태그로 재료를 검색해보세요.',
  width,
  style,
  tags,
  ...props
}: InputBoxProps) {
  const filterdSearchItems = searchItems?.filter(
    (itemValue) => hangul.search(itemValue, inputValue) >= 0,
  );

  return (
    <Popover style={{ width }} preventCloseOnClickTrigger position="full-width">
      <Popover.Trigger preventTrigger={!!tags}>
        <div css={triggerStyle.wrapper} style={{ ...style }} {...props}>
          <Group css={triggerStyle.group} gap={13}>
            <IconSearch />
            {tags ? (
              <Group gap={13} css={{ overflowX: 'scroll', flexWrap: 'nowrap' }}>
                {tags}
              </Group>
            ) : (
              <input
                placeholder={placeholder}
                onChange={(e) => {
                  e;
                  onChange(e.target.value);
                }}
                value={inputValue}
                css={[triggerStyle.input, DesignSystem.Text.body]}
                type="text"
              />
            )}
          </Group>
        </div>
      </Popover.Trigger>
      <Popover.Content triggerPopoverMargin={0} css={contentStyle.wrapper}>
        {filterdSearchItems && (
          <Stack css={contentStyle.stack} spacing={5}>
            {filterdSearchItems.map((itemValue, index) => (
              <Group
                css={contentStyle.item}
                key={`search-item-${itemValue}-${index}`}
                onClick={() => onItemClick && onItemClick(itemValue, index)}
              >
                <IconSearchXs />
                <Typography css={contentStyle.text} variant="body">
                  {itemValue}
                </Typography>
              </Group>
            ))}
          </Stack>
        )}
      </Popover.Content>
    </Popover>
  );
}

export default InputBox;
