import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import Calendar from 'react-calendar';

export const CustomCalendar = styled(Calendar)`
    width: 50%;
    border-radius: 20px;
    border: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

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

    .react-calendar__navigation button:enabled:hover,
    .react-calendar__navigation button:enabled:focus {
        background-color: #ffeccc;
        border-radius: 20px 20px 0 0;
    }

    .react-calendar__month-view {
        padding: 12px 32px;

        abbr {
            color: brown;
            font-size: 16px;
            font-weight: 500;
            text-decoration: none; /* 밑줄 제거 */
        }
    }

    .react-calendar__month-view__weekdays {
        abbr {
            font-size: 18px;
            font-weight: 900;
            text-decoration: none;
        }
    }

    .react-calendar__tile {
        text-align: center;
        height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        border-radius: 14px; /* 모든 타일에 기본 곡률 */
        transition: background 0.2s ease;
    }

    /* 1. 기본 타일 Hover 및 Focus */
    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus {
        background: #ffc0b7 !important;
        border-radius: 14px;
    }

    /* 2. 오늘 날짜 스타일 (선택되지 않았을 때) */
    .react-calendar__tile--now {
        background: #fff0ee !important; /* 배경을 아주 연하게 */
        border: 2px solid #ff8982 !important; /* 테두리로 오늘임을 표시 */
        border-radius: 14px;
    }

    /* 3. 현재 선택된 날짜 강조 (가장 높은 우선순위) */
    .react-calendar__tile--active {
        background: #ff8982 !important; /* 클릭된 날을 진한 핑크로 */
        color: white !important;
        border-radius: 14px;
        border: none !important; /* 선택되면 오늘 테두리 제거 */
    }

    .react-calendar__tile--active abbr {
        color: white !important;
    }

    /* 4. 선택된 상태에서 hover 해도 색상 유지 */
    .react-calendar__tile--active:enabled:hover,
    .react-calendar__tile--active:enabled:focus {
        background: #ff766e !important;
    }

    /* 도트 스타일 */
    .dot-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 4px;
    }

    .dot {
        width: 6px;
        height: 6px;
        background-color: #3b82f6;
        border-radius: 50%;
    }

    .react-calendar__tile--active .dot {
        background-color: #fff;
    }
    .blocked-tile {
        background-color: #f0f0f0 !important; /* 연한 회색 */
        color: #ccc !important; /* 글자색도 연하게 */
        text-decoration: line-through; /* 글자에 취소선 추가 (선택사항) */
    }
    .dot-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 10px;
    }
`;

export const CalendarContent = styled.div`
    display: flex;
    justify-content: center;
    padding: 10px 20px;
    width: 100%;
`;