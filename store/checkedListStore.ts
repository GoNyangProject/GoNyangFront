import { create } from 'zustand/index';

interface checkedList {
    checkedList: number[] | null;
    setCheckedList: (checkedList: number[] | null) => void;
}

export const useCheckedListStore = create<checkedList>((set) => ({
    checkedList: [],
    setCheckedList: (checkedList) => set({ checkedList: checkedList }),
}));
