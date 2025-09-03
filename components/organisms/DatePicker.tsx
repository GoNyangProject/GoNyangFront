import React, { useEffect, useMemo, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { CustomCalendar } from '../../styles/components/organism/DatePicker';
import { useDialogStore } from '../../store/dialogStore';
import { DialogType } from '../../enum/Dialog';
import { Book } from '../../types/Common';
import { formatDate } from '@/utils/validations/formValidators';

interface dateProps {
    bookData: Book[];
}

const DatePicker = ({ bookData }: dateProps) => {
    const [date, setDate] = useState<Date>(new Date());
    const { setSelectedDate, openDialog } = useDialogStore();
    const onClickDay = (date: Date) => {
        if (!date) {
            return;
        }
        const clickedDate = formatDate(date);
        setDate(clickedDate as Date);
        setSelectedDate(date);
        openDialog(DialogType.CALENDAR);
    };

    const bookedList = useMemo(() => {
        if (!bookData) {
            return [];
        }
        return bookData.map((book: Book) => {
            return new Date(book.bookDate);
        });
    }, [bookData]);

    useEffect(() => {
        console.log(bookedList);
    }, [bookedList]);

    const handleClickMonth = ({ activeStartDate, view }) => {
        if (view === 'month') {
            setSelectedDate(activeStartDate);
        }
    };

    return (
        <CustomCalendar
            locale={'en'}
            value={date}
            next2Label={null}
            prev2Label={null}
            onClickDay={onClickDay}
            onActiveStartDateChange={handleClickMonth}
            tileDisabled={({ date, view }) => {
                if (view === 'month') {
                    return bookedList.some((bookedDate) => bookedDate.toDateString() === date.toDateString());
                }
                return false; // 다른 뷰에서는 비활성화하지 않음
            }}
        />
    );
};

export default DatePicker;
