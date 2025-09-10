import React, { useMemo, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { CustomCalendar } from '../../styles/components/organism/DatePicker';
import { useDialogStore } from '../../store/dialogStore';
import { DialogType } from '../../enum/Dialog';
import { Book } from '../../types/Common';
import { formatDate } from '@/utils/validations/formValidators';
import { BookingTimes } from '../../enum/Menu';

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

    const bookedCountsByDate = useMemo(() => {
        const counts: { [key: string]: number } = {};
        if (!bookData) {
            return counts;
        }

        bookData.forEach((book: Book) => {
            const dateKey = formatDate(new Date(book.bookDate))?.toString();
            if (dateKey) {
                counts[dateKey] = (counts[dateKey] || 0) + 1;
            }
        });
        return counts;
    }, [bookData]);

    // 예약 가능한 전체 슬롯 수를 계산합니다.
    const totalAvailableSlots = Object.values(BookingTimes).length;

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
                    const dateKey = formatDate(date)?.toString();
                    const bookedCount = bookedCountsByDate[dateKey!] || 0;
                    return bookedCount >= totalAvailableSlots;
                }
                return false;
            }}
        />
    );
};

export default DatePicker;
