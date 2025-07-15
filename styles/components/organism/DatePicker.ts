import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import Calendar from 'react-calendar';

export const CustomCalendar = styled(Calendar)`
    width: 50%;
    border-radius: 20px;

    .react-calendar__navigation {
        background: #fce3db;
        border-bottom: 4px solid #aa3d1d;
        height: 90px;
        border-radius: 20px 20px 0 0;

        span {
            font-size: 24px;
            font-weight: 600;
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

    // 네비게이션 버튼 부분
    .react-calendar__navigation button:enabled:hover,
    .react-calendar__navigation button:enabled:focus {
        background-color: #ffeccc;
        border-radius: 20px 20px 0 0;
    }

    .react-calendar__month-view {
        padding: 12px 32px;

        abbr {
            // 텍스트
            color: brown;
            font-size: 16px;
            font-weight: 500;
        }
    }

    .react-calendar__month-view__weekdays {
        abbr {
            // 텍스트 부분
            font-size: 18px;
            font-weight: 900;
        }
    }

    // 제목 부분
    .react-calendar__tile {
        text-align: center;
        height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    // mouse hover 시
    .react-calendar__tile--active {
        background-color: #fce3db;
        border-radius: 14px;
    }


    // 현재 선택된 날짜
    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus {
        background: #ffc0b7;
        border-radius: 14px;
    }

    // 오늘 날짜
    .react-calendar__tile--now {
        background: #ff8982;
        border-radius: 14px;
    }

    /*hover, focus 시 */

    .react-calendar__tile--now:enabled:hover,
    .react-calendar__tile--now:enabled:focus {
        background: #ffc0b7;
        border-radius: 14px;
    }
`;

export const CalendarContent = styled.div`
    display: flex;
    justify-content: center;
    padding: 10px 20px;
    width: 100%;
    background-color: pink;
`;