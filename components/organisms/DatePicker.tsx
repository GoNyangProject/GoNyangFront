import React, { useMemo, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { CustomCalendar } from '../../styles/components/organism/DatePicker';
import { useDialogStore } from '../../store/dialogStore';
import { DialogType } from '../../enum/Dialog';
import {AdminBlockResponse, AdminBookResponse, Book} from '../../types/Common';
import { formatDate } from '@/utils/validations/formValidators';
import { BookingTimes } from '../../enum/Menu';

interface dateProps {
    bookData: (Book | AdminBookResponse)[];
    isAdmin?: boolean;
    blockData: AdminBlockResponse[];
    onDateChange?: (date: Date) => void;
}

const DatePicker = ({ bookData, isAdmin, onDateChange, blockData }: dateProps) => {
    const [date, setDate] = useState<Date>(new Date());
    const { setSelectedDate, openDialog } = useDialogStore();
    const onClickDay = (date: Date) => {
        if (!date) return;
        setDate(date);
        setSelectedDate(date);
        if (isAdmin && onDateChange) {
            onDateChange(date);
        }
        if (!isAdmin) {
            openDialog(DialogType.CALENDAR);
        }
    };
    const blockedDates = useMemo(() => {
        return new Set(blockData?.map((b) => b.blockDate));
    }, [blockData]);

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
            tileDisabled={({ date, view }) => {
                if (isAdmin) return false;
                if (view === 'month') {
                    const dateKey = formatDate(date)?.toString();

                    if (blockedDates.has(dateKey)) return true;

                    const bookedCount = bookedCountsByDate[dateKey!] || 0;
                    return bookedCount >= totalAvailableSlots;
                }
                return false;
            }}
            tileContent={({ date, view }) => {
                if (view === 'month') {
                    const dateKey = formatDate(date)?.toString();

                    if (blockedDates.has(dateKey)) {
                        return (
                            <div className="dot-container">
                                <span style={{ fontSize: '10px' }}>🔒</span>
                            </div>
                        );
                    }
                    const count = bookedCountsByDate[dateKey!] || 0;
                    if (count > 0) {
                        if (isAdmin) {
                            return (
                                <div className="dot-container">
                                    <div className="dot"></div>
                                </div>
                            );
                        }
                    }
                }
                return null;
            }}
            tileClassName={({ date, view }) => {
                if (view === 'month') {
                    const dateKey = formatDate(date)?.toString();
                    if (blockedDates.has(dateKey)) {
                        return 'blocked-tile';
                    }
                }
                return null;
            }}
        />
    );
};

export default DatePicker;
