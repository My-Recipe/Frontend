import IconSearchXs from '@/assets/icon-search-xs.svg';
import IconSearch from '@/assets/icon-search.svg';
import { Group, Popover, Stack } from '@base';
import hangul from 'hangul-js';
import { useMemo } from 'react';

export interface InputBoxProps {
  searchItems?: string[];
  value: string;
  onChange: (value: string) => void;
}

function InputBox({
  value: inputValue,
  onChange,
  searchItems,
  ...props
}: InputBoxProps) {
  const filterdSearchItems = searchItems?.filter(
    (itemValue) => hangul.search(itemValue, inputValue) >= 0,
  );

  const iconSearchXs = useMemo(() => <img src={IconSearchXs} />, []);

  return (
    <Popover preventCloseOnClickTrigger position="bottom-left">
      <Popover.Trigger>
        <div css={{ padding: '16px 26px', backgroundColor: 'white' }}>
          <Group gap={13}>
            <img src={IconSearch} />
            <input
              onChange={(e) => onChange(e.target.value)}
              value={inputValue}
              css={{ color: 'black', flex: 1 }}
              type="text"
            />
          </Group>
        </div>
      </Popover.Trigger>
      <Popover.Content>
        {filterdSearchItems && (
          <Stack spacing={10}>
            {filterdSearchItems.map((itemValue, index) => (
              <Group gap={10} key={`search-item-${itemValue}-${index}`}>
                {iconSearchXs}
                {itemValue}
              </Group>
            ))}
          </Stack>
        )}
      </Popover.Content>
    </Popover>
  );
}

export default InputBox;
