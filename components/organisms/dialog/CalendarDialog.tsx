import React, { useEffect, useMemo, useState } from 'react';
import Dialog from '../../molecules/Dialog';
import { DialogType } from '../../../enum/Dialog';
import { useDialogStore } from '../../../store/dialogStore';
import axiosInstance from '../../../libs/axios';
import { formatDate } from '@/utils/validations/formValidators';
import { Book, BookInfo, Menu } from '../../../types/Common';
import { BookingTimes, MenuType } from '../../../enum/Menu';
import Button from '../../atom/Button';
import { userStore } from '../../../store/userStore';
import { DetailsRow, Price, Rating, ServiceCard, ServiceDescription, ServiceName } from '../../../styles/pages/menu/Menu';

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
            width="50vw"
            height="60vh"
            style={{ backgroundColor: 'white' }}
            onClickConfirm={handlePayBook}
            onClickCancel={handleClickCancel}
            confirmText={'결제하기'}
            showBtn={true}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: '100%',
                    height: '100%',
                    padding: '10px',
                    alignItems: 'center',
                }}
            >
                <ServiceCard style={{ flexDirection: 'column', border: 'none' }}>
                    <ServiceName>{selectedMenu?.menuName}</ServiceName>
                    <ServiceDescription>{selectedMenu?.content}</ServiceDescription>
                    <DetailsRow>
                        <Rating>{selectedMenu?.score}</Rating>
                        <Price>{selectedMenu?.price.toLocaleString()} 원</Price>
                    </DetailsRow>
                </ServiceCard>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        height: '100%',
                        padding: '0 10px',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                    >
                        <div>예약시간</div>
                        {Object.values(BookingTimes).map((time) => {
                            const timeHour = parseInt(time.split(':')[0]);

                            const isBooked = currentBookData.find((book: Book) => new Date(book.bookDate).getHours() === timeHour && book.deletedAt == null);

                            return (
                                <Button
                                    key={time}
                                    onClick={() => setSelectedTime(time)}
                                    style={{
                                        padding: '10px 20px',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        backgroundColor: selectedTime === time ? '#D2B48C' : isBooked ? '#CCCCCC' : 'bisque',
                                        color: isBooked ? '#666666' : 'black',
                                        pointerEvents: isBooked ? 'none' : 'auto',
                                    }}
                                >
                                    {time}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default CalendarDialog;
