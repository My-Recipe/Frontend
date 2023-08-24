import IconSearch from '@/assets/icon_search.svg';
import IconSearchXs from '@/assets/icon_search_xs.svg';
import { Group, Popover, Stack } from '@base';
import hangul from 'hangul-js';
import { useState } from 'react';

export interface InputBoxProps {
  searchItems?: string[];
}

function InputBox({ searchItems, ...props }: InputBoxProps) {
  const [inputValue, setInputValue] = useState('');

  const filterdSearchItems = searchItems?.filter(
    (itemValue) => hangul.search(itemValue, inputValue) >= 0,
  );

  return (
    <Popover preventCloseOnClickTrigger position="bottom-left">
      <Popover.Trigger>
        <div css={{ padding: '16px 26px', backgroundColor: 'white' }}>
          <Group gap={13}>
            <img src={IconSearch} />
            <input
              onChange={(e) => setInputValue(e.target.value)}
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
                <img src={IconSearchXs} />
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
