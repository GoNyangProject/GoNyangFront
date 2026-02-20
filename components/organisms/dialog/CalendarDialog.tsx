import React, { useEffect, useMemo, useState } from 'react';
import Dialog from '../../molecules/Dialog';
import { DialogType } from '../../../enum/Dialog';
import { useDialogStore } from '../../../store/dialogStore';
import axiosInstance from '../../../libs/axios';
import { formatDate } from '@/utils/validations/formValidators';
import { Book, BookInfo, Menu } from '../../../types/Common';
import { BookingTimes, MenuType } from '../../../enum/Menu';
import { userStore } from '../../../store/userStore';
import {
    DetailsRow,
    DialogContentWrapper,
    Price,
    Rating,
    ServiceCard,
    ServiceDescription,
    ServiceName,
    TimeButton,
    TimeGrid,
    TimeSection,
    TimeTitle,
} from '../../../styles/pages/menu/Menu';

const fetcher = (payload: Request) => axiosInstance.post('/api/backend', payload).then((res) => res.data);

interface bookProps {
    bookData: Book[];
    setCurrentTab: React.Dispatch<React.SetStateAction<MenuType>>;
    selectedMenu: Menu | undefined;
    setBookInfo: React.Dispatch<React.SetStateAction<BookInfo | undefined>>;
}

const CalendarDialog = ({ bookData, setCurrentTab, selectedMenu, setBookInfo }: bookProps) => {
    useEffect(() => {
        closeDialog(DialogType.CALENDAR);
    }, []);

    const { selectedDate, closeDialog } = useDialogStore();
    const [selectedTime, setSelectedTime] = useState<string>();
    const { userData } = userStore();
    const currentBookData = useMemo(() => {
        if (!bookData) {
            return [];
        }
        return bookData.filter((book: Book) => formatDate(new Date(book.bookDate)) === formatDate(selectedDate));
    }, [bookData, selectedDate]);

    const handlePayBook = () => {
        if (!selectedTime) {
            alert('예약하실 시간을 선택해 주세요');
            return;
        }
        const bookInfo = {
            menu: selectedMenu!,
            userData: userData,
            bookDate: `${formatDate(selectedDate)} ${selectedTime!}`,
        };
        setBookInfo(bookInfo);
        setCurrentTab(MenuType.PAY_CONFIRM);
    };
    const handleClickCancel = () => {
        setSelectedTime('');
        closeDialog(DialogType.CALENDAR);
    };

    return (
        <Dialog
            type={DialogType.CALENDAR}
            title={`${formatDate(selectedDate)} 예약`}
            style={{ backgroundColor: 'white' }}
            onClickConfirm={handlePayBook}
            onClickCancel={handleClickCancel}
            confirmText={'결제하기'}
            showBtn={true}
        >
            <DialogContentWrapper>
                <ServiceCard style={{ flexDirection: 'column', border: 'none', boxShadow: 'none' }}>
                    <ServiceName>{selectedMenu?.menuName}</ServiceName>
                    <ServiceDescription>{selectedMenu?.content}</ServiceDescription>
                    <DetailsRow>
                        <Rating>{selectedMenu?.score}</Rating>
                        <Price>{selectedMenu?.price.toLocaleString()} 원</Price>
                    </DetailsRow>
                </ServiceCard>

                <TimeSection>
                    <TimeTitle>예약시간</TimeTitle>
                    <TimeGrid>
                        {Object.values(BookingTimes).map((time) => {
                            const timeHour = parseInt(time.split(':')[0]);
                            const isBooked = currentBookData.find((book: Book) => new Date(book.bookDate).getHours() === timeHour && book.deletedAt == null);

                            return (
                                <TimeButton
                                    key={time}
                                    $isSelected={selectedTime === time}
                                    $isBooked={isBooked}
                                    disabled={!!isBooked}
                                    onClick={() => setSelectedTime(time)}
                                >
                                    {time}
                                </TimeButton>
                            );
                        })}
                    </TimeGrid>
                </TimeSection>
            </DialogContentWrapper>
        </Dialog>
    );
};

export default CalendarDialog;
