import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { CustomCalendar } from '../../styles/components/atom/DatePicker';

const DatePicker = () => {
    const [date, setDate] = useState<Date>(new Date());
    return (
        <div>
            <CustomCalendar locale={'en'} value={date} next2Label={null} prev2Label={null} />
        </div>
    );
};

export default DatePicker;
