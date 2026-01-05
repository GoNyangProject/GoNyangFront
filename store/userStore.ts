import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type User = {
    memberId: string;
    userId: string;
    username: string;
};

interface UserState {
    userData: User;
    setUserData: (userData: User) => void;
    reset: () => void;
}

export const userStore = create(
    persist<UserState>(
        (set) => ({
            userData: { memberId: '', userId: '', username: '' },
            setUserData: (userData) => set({ userData }),
            reset: () =>
                set({
                    userData: { memberId: '', userId: '', username: '' },
                }),
        }),
        { name: 'user-storage' },
    ),
);
