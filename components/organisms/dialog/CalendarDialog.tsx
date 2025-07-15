import React from 'react';
import Dialog from '../../molecules/Dialog';
import { DialogType } from '../../../enum/Dialog';
import { useDialogStore } from '../../../store/dialogStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Button from '../../atom/Button';

const CalendarDialog = () => {
    const { selectedDate, closeDialog } = useDialogStore();

    const handleCancelBook = () => {};
    const handleClickCancel = () => {
        closeDialog(DialogType.CALENDAR);
    };

    const handleClickPreviousBook = () => {
        alert('이전 버튼');
    };
    const handleClickNextBook = () => {
        alert('다음 버튼');
    };

    return (
        <Dialog
            type={DialogType.CALENDAR}
            title={`${selectedDate} 일정`}
            width="50vw"
            height="70vh"
            style={{ backgroundColor: 'white' }}
            onClickConfirm={handleCancelBook}
            onClickCancel={handleClickCancel}
            confirmText={'예약 취소'}
            showBtn={true}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    height: '10%',
                    padding: '0 10px',
                }}
            >
                <Button onClick={handleClickPreviousBook}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </Button>
                <div>내용 ㅎㅎ</div>
                <Button onClick={handleClickNextBook}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </Button>
            </div>
        </Dialog>
    );
};

export default CalendarDialog;
