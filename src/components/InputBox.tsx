import IconSearch from '@/assets/icon_search_xs.svg';
import { Group, Popover, Stack } from '@base';
import { useState } from 'react';

export interface InputBoxProps {
  searchItems?: string[];
}

function InputBox({ searchItems, ...props }: InputBoxProps) {
  const [inputValue, setInputValue] = useState('');

  const filterdSearchItems = searchItems?.filter((itemValue) =>
    itemValue.includes(inputValue),
  );

  return (
    <Popover preventCloseOnClickTrigger position="bottom-left">
      <Popover.Trigger>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          css={{ width: '100%' }}
          type="text"
        />
      </Popover.Trigger>
      <Popover.Content>
        {filterdSearchItems && (
          <Stack spacing={10}>
            {filterdSearchItems.map((itemValue) => (
              <Group css={{ gap: 10 }}>
                <img src={IconSearch} />
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
