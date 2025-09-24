import React from 'react';
import { useDialogStore } from '../../../store/dialogStore';
import { DialogType } from '../../../enum/Dialog';
import Dialog from '../../molecules/Dialog';
import { BookHeader, BookMainWrapper, BookMenuLogo } from '../../../styles/pages/mypage/Mypage';
import { DetailsRow, Price, ServiceCard, ServiceDescription, ServiceName } from '../../../styles/pages/menu/Menu';

const BookDetailDialog = () => {
    const { selectedBook, closeDialog } = useDialogStore();

    const handleCancelBook = () => {};

    const handleClickCancel = () => {
        closeDialog(DialogType.BOOK_DETAIL);
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return '';
        const date = new Date(dateStr.replace(' ', 'T'));
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}년 ${month}월 ${day}일`;
    };

    const formatTime = (dateStr: string) => {
        if (!dateStr) return '';
        const date = new Date(dateStr.replace(' ', 'T'));
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? '오후' : '오전';
        hours = hours % 12;
        hours = hours ? hours : 12; // The hour '0' should be '12'
        const hourStr = hours < 10 ? `0${hours}` : `${hours}`;
        const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
        return `${ampm} ${hourStr}:${minutesStr}`;
    };

    const formattedDate = formatDate(selectedBook?.bookDate || '');
    const formattedTime = formatTime(selectedBook?.bookDate || '');

    return (
        <Dialog
            type={DialogType.BOOK_DETAIL}
            title={'나의 예약'}
            width="50vw"
            height="50vh"
            style={{ backgroundColor: 'white' }}
            onClickConfirm={handleCancelBook}
            onClickCancel={handleClickCancel}
            confirmText={'예약 취소'}
            showBtn={true}
        >
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '15px' }}>
                <BookHeader
                    style={{
                        textAlign: 'left',
                        fontWeight: '600',
                        fontSize: '25px',
                    }}
                >
                    {formattedDate}
                </BookHeader>
                <div style={{ textAlign: 'left', fontSize: '18px' }}>{formattedTime}</div>
                <BookMainWrapper style={{ flex: 1, border: 'none', padding: 0, justifyContent: 'center', alignItems: 'center' }}>
                    <ServiceCard style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <BookMenuLogo style={{ width: '40%', height: '100%' }} />
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                textAlign: 'left',
                            }}
                        >
                            <ServiceName>{selectedBook?.menuName}</ServiceName>
                            <ServiceDescription>{selectedBook?.content}</ServiceDescription>
                            <DetailsRow style={{ width: '100%', justifyContent: 'right' }}>
                                <Price style={{ textAlign: 'right' }}>{selectedBook?.price.toLocaleString()} 원</Price>
                            </DetailsRow>
                        </div>
                    </ServiceCard>
                </BookMainWrapper>
            </div>
        </Dialog>
    );
};

export default BookDetailDialog;
