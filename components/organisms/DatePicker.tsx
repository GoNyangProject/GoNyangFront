import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { CustomCalendar } from '../../styles/components/organism/DatePicker';
import { useDialogStore } from '../../store/dialogStore';
import { DialogType } from '../../enum/Dialog';

const DatePicker = () => {
    const [date, setDate] = useState<Date>(new Date());
    const { setSelectedDate, openDialog } = useDialogStore();
    const onClickDay = (date: Date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const clickedDate = `${year}-${month}-${day}` as unknown as Date;
        setDate(clickedDate);
        setSelectedDate(clickedDate);
        openDialog(DialogType.CALENDAR);
    };

    return <CustomCalendar locale={'en'} value={date} next2Label={null} prev2Label={null} onClickDay={onClickDay} />;
};

export default DatePicker;
