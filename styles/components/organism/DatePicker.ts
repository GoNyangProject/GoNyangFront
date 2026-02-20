import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import Calendar from 'react-calendar';

export const CustomCalendar = styled(Calendar)`
    width: 100%;
    max-width: 900px;
    border-radius: 20px;
    border: none;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
    background: white;

    @media (max-width: 768px) {
        width: 100%;
        max-width: none;
    }

    .react-calendar__navigation {
        background: #fce3db;
        border-bottom: 2px solid #aa3d1d;
        height: 70px;
        border-radius: 20px 20px 0 0;

        span {
            font-size: 24px;
            font-weight: 700;
            color: brown;
        }
    }

    .react-calendar__navigation button {
        color: brown;
        font-size: 25px;
        font-weight: bold;
    }

    .react-calendar__navigation button:disabled {
        background-color: pink;
        border-radius: 20px 20px 0 0;
    }

    .react-calendar__navigation button:enabled:hover,
    .react-calendar__navigation button:enabled:focus {
        background-color: #ffeccc;
        border-radius: 20px 20px 0 0;
    }

    .react-calendar__month-view {
        padding: 12px 32px;

        @media (max-width: 768px) {
            padding: 10px 5px;
        }

        abbr {
            color: brown;
            font-size: 16px;
            font-weight: 500;
            text-decoration: none;
        }
    }

    .react-calendar__month-view__weekdays {
        padding: 10px 0;

        abbr {
            font-size: 16px;
            font-weight: 800;
            text-decoration: none;
            color: #aa3d1d;
        }
    }

    .react-calendar__month-view__days {
        padding: 10px;
    }

    .react-calendar__tile {
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        font-weight: 600;

        @media (max-width: 768px) {
            height: 65px; // 모바일은 기존 폼 유지
            font-size: 14px;
        }
    }

    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus {
        background: #ffc0b7 !important;
        border-radius: 14px;
    }

    .react-calendar__tile--now {
        background: #fff0ee !important;
        border: 2px solid #ff8982 !important;
        border-radius: 14px;
    }

    .react-calendar__tile--active {
        background: #ff8982 !important;
        color: white !important;
        border-radius: 14px;
        border: none !important;
    }

    .react-calendar__tile--active abbr {
        color: white !important;
    }

    .dot-container {
        margin-top: 8px;
        height: 12px;
    }

    .dot {
        width: 8px;
        height: 8px;
    }

    .react-calendar__tile--active .dot {
        background-color: #fff;
    }

    .blocked-tile {
        background-color: #f0f0f0 !important;
        color: #ccc !important;
        text-decoration: line-through;
    }
`;

export const CalendarContent = styled.div`
    display: flex;
    justify-content: center;
    padding: 10px 20px;
    width: 100%;
`;
