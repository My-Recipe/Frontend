import { Group, Tabs } from '@base';
import TabsButton from '@base/Tabs/TabsButton';
import { css } from '@emotion/react';
import { ReactNode } from 'react';

interface TopNavBarChild {
  children: string[];
  icon: ReactNode;
}
function TopNavBar({ icon, children }: TopNavBarChild) {
  // const [isClicked, setIsClicked] = useState();

  return (
    <Tabs buttonGroupCss={css({ gap: '65px' })}>
      <TabsButton
        value={'myrecipe'}
        css={{
          // fontFamily: 'Pretendard',
          fontSize: '20px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: 'normal',
          color: '#292929',
          background: 'transparent',
          border: 'none',
        }}
      >
        <Group css={{ gap: 6 }}>
          {icon}
          {children[0]}
        </Group>
      </TabsButton>
      <TabsButton
        value={'inventory'}
        css={{
          // fontFamily: 'Pretendard',
          fontSize: '20px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: 'normal',
          color: '#292929',
          background: 'transparent',
          border: 'none',
        }}
      >
        <Group css={{ gap: 6 }}>
          {icon}
          {children[1]}
        </Group>
      </TabsButton>
      <TabsButton
        value={'search'}
        css={{
          // fontFamily: 'Pretendard',
          fontSize: '20px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: 'normal',
          color: '#292929',
          background: 'transparent',
          border: 'none',
        }}
      >
        <Group css={{ gap: 6 }}>
          {icon}
          {children[2]}
        </Group>
      </TabsButton>
    </Tabs>
  );
}

export default TopNavBar;
