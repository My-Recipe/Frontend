import DesignSystem from '@/utils/designSystem';
import { useElementSize } from '@/utils/hooks';
import globalStyles from '@/utils/styles';
import { Typography } from '@base';
import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';

const ANIMATE_DURATION = 250;
const styles = {
  animation: {
    textFade: globalStyles.animation.all(ANIMATE_DURATION / 2),
    overlay: globalStyles.animation.transform(ANIMATE_DURATION / 2),
  },
  wrapper: css({
    position: 'relative',
    display: 'flex',
    height: 51,
    background: DesignSystem.Color.background.white,
    borderRadius: 50,
    border: `1.4px solid ${DesignSystem.Color.background.black}`,
    padding: '0 4px',
  }),
  overlay: css({
    position: 'absolute',
    zIndex: 1,
    boxShadow: 'none',
    borderRadius: 30,
    border: `1.4px solid ${DesignSystem.Color.background.black}`,
    background: DesignSystem.Color.primary.yellow,
    textAlign: 'center',
    margin: 'auto',
    top: 0,
    bottom: 0,
  }),
  item: {
    wrapper: css({
      position: 'relative',
      boxSizing: 'border-box',
      flex: 1,
      zIndex: 2,
      height: '100%',
    }),
    label: css(
      {
        height: '100%',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        padding: '0 27px',
      },
      globalStyles.button,
      globalStyles.center,
    ),
  },
};

export interface ToggleProps {
  tabs: string[];
  onChange?: (value: string, index: number) => void;
  value?: string;
}

function ToggleButton({
  tabs,
  value: propsTabValue,
  onChange,
  ...props
}: ToggleProps) {
  const { ref, width } = useElementSize();
  const tabsRef = useRef<Array<HTMLLabelElement | null>>([]);
  const [localTabValue, setTabValue] = useState(tabs[0]);
  const tabValue = propsTabValue || localTabValue;
  const currentTabIndex = tabs.indexOf(tabValue);
  const tabLength = tabs.length;
  const itemWidth = width / tabLength;

  const [activePosition, setActivePosition] = useState({
    width: 0,
    height: 0,
    translateX: 0,
  });

  useEffect(() => {
    if (ref.current && tabsRef.current) {
      const refs = tabsRef.current;
      const width = refs[currentTabIndex]?.clientWidth || 0;
      const translateX = refs
        .slice(0, currentTabIndex)
        .reduce(
          (total, currentItem) => total + (currentItem?.clientWidth || 0),
          0,
        );

      setActivePosition({
        width,
        height: 43,
        translateX,
      });
    }
  }, [tabValue, ref, itemWidth, tabsRef]);

  const handleClickTabItem = (value: string, index: number) => {
    if (value !== tabValue) {
      if (!propsTabValue) setTabValue(value);
      onChange?.(value, index);
    }
  };

  return (
    <div css={styles.wrapper} ref={ref}>
      {activePosition.width && (
        <span
          css={[styles.overlay, styles.animation.overlay]}
          style={{
            width: activePosition.width,
            height: activePosition.height,
            transform: `translate(${activePosition.translateX}px, 0)`,
          }}
        />
      )}
      {tabs.map((value, index) => {
        const isActiveTab = value === tabValue;
        return (
          <div css={styles.item.wrapper} key={`toggle-${index}-${value}`}>
            <label
              css={styles.item.label}
              onClick={() => handleClickTabItem(value, index)}
              ref={(el) => (tabsRef.current[index] = el)}
            >
              <Typography
                style={{
                  color: isActiveTab
                    ? DesignSystem.Color.text.black
                    : DesignSystem.Color.background.disabled,
                }}
                css={styles.animation.textFade}
                variant="button"
              >
                {value}
              </Typography>
            </label>
          </div>
        );
      })}
    </div>
  );
}

export default ToggleButton;
