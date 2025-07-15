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
}

export const useDialogStore = create<DialogState>((set) => ({
    selectedDialogs: [],

    openDialog: (dialogType) =>
        set((state) => ({
            selectedDialogs: [...state.selectedDialogs, { dialogType, isOpen: true }],
        })),
    closeDialog: (dialogType) =>
        set((state) => ({
            selectedDialogs: state.selectedDialogs.filter((d) => d.dialogType !== dialogType),
        })),
}));
