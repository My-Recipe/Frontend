import { ReactComponent as IconTrash } from '@/assets/icon-trash.svg';
import DesignSystem from '@/utils/designSystem';
import globalStyles from '@/utils/styles';
import { css } from '@emotion/react';
import { useState } from 'react';
import { TextType } from '../Editor';

const styles = {
  root: css({
    position: 'relative',
    alignSelf: 'start',
  }),
  title: css(DesignSystem.Text.subtitle, {
    position: 'absolute',
    background: DesignSystem.Color.secondary.green,
    borderRadius: '0 0 4px 0',
    color: '#fff',
    padding: '14px 22px',
    top: 2,
    left: 2,
  }),
  remove: css(
    {
      padding: 10,
      position: 'absolute',
      top: 2,
      right: 2,
      background: DesignSystem.Color.background.white,
      borderRadius: '0 4px',
      height: 24,
      width: 24,
      ':active': {
        background: DesignSystem.Color.background.disabled,
      },
    },
    globalStyles.button,
  ),
  image: css(
    {
      borderRadius: DesignSystem.Round.solid,
      margin: 2,
    },
    globalStyles.button,
  ),
  imageHover: css({
    margin: 0,
    border: '2px solid var(--secondary-green)',
  }),
};

export interface ImageProps {
  item: TextType;
  isTitle: boolean;
  handleImageClick: () => void;
  handleRemove: () => void;
}

function Image({
  item,
  isTitle,
  handleImageClick,
  handleRemove,
  ...props
}: ImageProps) {
  const [isOver, setIsOver] = useState(true);

  return (
    <div css={styles.root}>
      {isTitle && <div css={styles.title}>대표 이미지</div>}
      {isOver && (
        <div
          onMouseOver={() => setIsOver(true)}
          onMouseOut={() => setIsOver(false)}
          onClick={handleRemove}
          css={styles.remove}
        >
          <IconTrash />
        </div>
      )}
      <img
        css={[styles.image, isOver && styles.imageHover]}
        loading="lazy"
        src={item.value}
        key={`data-image-${item.key}`}
        onClick={handleImageClick}
        onMouseOver={() => setIsOver(true)}
        onMouseOut={() => setIsOver(false)}
      />
    </div>
  );
}

export default Image;
