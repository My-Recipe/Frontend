import DefaultProfile from '@/assets/icons/default-profile.svg';
import { useCurrentUser } from '@/auth/hooks';
import { ImgHTMLAttributes } from 'react';

export interface UserProfileProps extends ImgHTMLAttributes<HTMLImageElement> {
  width?: number;
}

function UserProfileImg({ width, ...props }: UserProfileProps) {
  const { user } = useCurrentUser();

  return (
    <img src={user.profileImage || DefaultProfile} css={{ width }} {...props} />
  );
}

export default UserProfileImg;
