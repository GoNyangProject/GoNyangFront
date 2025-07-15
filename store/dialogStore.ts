import { DialogType } from '../enum/Dialog';
import { create } from 'zustand';

export type Dialog = {
    dialogType: DialogType;
    isOpen: boolean;
};

interface DialogState {
    selectedDialogs: Dialog[];
    openDialog: (dialogType: DialogType) => void;
    closeDialog: (dialogType: DialogType) => void;
    selectedDate: Date | null;
    setSelectedDate: (selectedDate: Date) => void;
}

export const useDialogStore = create<DialogState>((set) => ({
    selectedDialogs: [],
    selectedDate: null,
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
}));
