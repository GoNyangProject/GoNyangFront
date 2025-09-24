import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type User = {
    memberId: number | null;
    userId: string;
    username: string;
};

interface UserState {
    userData: User;
    setUserData: (userData: User) => void;
}

export const userStore = create(
    persist<UserState>(
        (set) => ({
            userData: { memberId: null, userId: '', username: '' },
            setUserData: (userData) => set(() => ({ userData })),
        }),
        { name: 'user-storage' },
    ),
);
