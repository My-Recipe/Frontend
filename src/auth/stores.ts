import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface UserType {
  name: string | null;
  email: string | null;
  profileImage: string | null;
  isLoggedIn: boolean;
}

export type UserSetPropType = Omit<UserType, 'isLoggedIn'>;

interface UserState {
  user: UserType;
  setUser: (user: UserSetPropType) => void;
  removeUser: () => void;
}

export const useUserState = create<UserState>()(
  devtools((set) => ({
    user: {
      isLoggedIn: false,
      name: null,
      email: null,
      profileImage: null,
    },
    setUser: (user) => set(() => ({ user: { ...user, isLoggedIn: true } })),
    removeUser: () =>
      set(() => ({
        user: {
          isLoggedIn: false,
          name: null,
          email: null,
          profileImage: null,
        },
      })),
  })),
);
