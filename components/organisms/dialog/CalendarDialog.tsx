import React from 'react';
import Dialog from '../../molecules/Dialog';
import { DialogType } from '../../../enum/Dialog';
import { useDialogStore } from '../../../store/dialogStore';

const CalendarDialog = () => {
    const { closeDialog } = useDialogStore();

    const handleClickConfirm = () => {};
    const handleClickCancel = () => {
        closeDialog(DialogType.CALENDAR);
    };

    return (
        <Dialog
            type={DialogType.CALENDAR}
            title={'일정'}
            width="50vw"
            height="70vh"
            style={{ backgroundColor: 'white' }}
            onClickConfirm={handleClickConfirm}
            onClickCancel={handleClickCancel}
        >
            <div>ㅎㅇㅎㅇ</div>
        </Dialog>
    );
};

export default CalendarDialog;
