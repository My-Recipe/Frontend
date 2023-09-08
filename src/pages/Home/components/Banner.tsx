import { Tabs } from '@base';
import { TabValueType } from '@base/Tabs/TabsMain';
import { useState } from 'react';

export interface BannerProps {}

function Banner({ ...props }: BannerProps) {
  const [value, setValue] = useState<TabValueType>(1);
  const styleProps = {
    buttonGroupCss: {},
    buttonCss: {},
    bodyWrapperCss: {},
    bodyCss: { height: 680, width: '100%' },
    css: {
      padding: '0 20px',
    },
  };
  return (
    <>
      <Tabs
        {...styleProps}
        value={value}
        onTabChange={(value) => setValue(value)}
      >
        <Tabs.Button bgColor="#FF874F" value={1}>
          01
        </Tabs.Button>
        <Tabs.Button bgColor="#FFEB3A" value={2}>
          02
        </Tabs.Button>
        <Tabs.Body bgColor="#FF874F" value={1}>
          세상에 똑같은 레시피느ㄴ없다
        </Tabs.Body>
        <Tabs.Body bgColor="#FFEB3A" value={2}>
          tast2body
        </Tabs.Body>
      </Tabs>
    </>
  );
}

export default Banner;
