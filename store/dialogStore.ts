import { DialogType } from '../enum/Dialog';
import { create } from 'zustand';
import { Book } from '../types/Common';

export type Dialog = {
    dialogType: DialogType;
    isOpen: boolean;
};

interface DialogState {
    selectedDialogs: Dialog[];
    openDialog: (dialogType: DialogType) => void;
    closeDialog: (dialogType: DialogType) => void;
    selectedDate: Date;
    setSelectedDate: (selectedDate: Date) => void;
    selectedBook: Book | null;
    setSelectedBook: (selectedBook: Book) => void;
}

export const useDialogStore = create<DialogState>((set) => ({
    selectedDialogs: [],
    selectedDate: new Date(),
    selectedBook: null,
    openDialog: (dialogType) =>
        set((state) => ({
            selectedDialogs: [...state.selectedDialogs, { dialogType, isOpen: true }],
        })),
    closeDialog: (dialogType) =>
        set((state) => ({
            selectedDialogs: state.selectedDialogs.filter((d) => d.dialogType !== dialogType),
        })),
    setSelectedDate: (date) =>
        set(() => ({
            selectedDate: date,
        })),
    setSelectedBook: (book) =>
        set(() => ({
            selectedBook: book,
        })),
}));
