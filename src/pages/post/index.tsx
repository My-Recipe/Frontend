import { css } from '@emotion/react';
import Editor from './components/Editor';

const pageStyles = {
  root: css({
    padding: '97px 0',
  }),
};

export interface PostPageProps {}

function PostPage({ ...props }: PostPageProps) {
  return (
    <div css={pageStyles.root}>
      <Editor />
    </div>
  );
}

export default PostPage;
