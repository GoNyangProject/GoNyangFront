import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type User = {
    memberId: string;
    userId: string;
    username: string;
    role: string;
    userType: string;
};

interface UserState {
    userData: User | null;
    setUserData: (userData: User) => void;
    reset: () => void;
}

export const userStore = create(
    persist<UserState>(
        (set) => ({
            userData: null,
            setUserData: (userData) => set({ userData }),
            reset: () => set({ userData: null }),
        }),
        {
            name: 'user-storage',
        },
    ),
);
