import styled from 'styled-components';

export const Container = styled.div`
    padding: 40px;
    background-color: #f9f9f9;
    min-height: 100vh;

    h2 {
        font-size: 24px;
        margin-bottom: 30px;
        color: #333;
        font-weight: bold;
    }
`;

export const ContentWrapper = styled.div`
    display: flex;
    gap: 30px;
    align-items: flex-start;
    max-width: 1200px;
    margin: 0 auto;

    @media (max-width: 1024px) {
        flex-direction: column;
    }
`;

export const CalendarSection = styled.div`
    flex: 1.2;
    background: #fff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

    /* 기존 CustomCalendar 스타일 커스텀 */

    .react-calendar {
        border: none;
        width: 100%;
    }
`;

export const DetailSection = styled.div`
    flex: 1;
    background: #fff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    min-height: 500px;

    h3 {
        font-size: 20px;
        margin-bottom: 20px;
        color: #444;
    }

    hr {
        border: 0;
        border-top: 1px solid #eee;
        margin-bottom: 20px;
    }
`;

export const ReservationList = styled.ul`
    list-style: none;
    padding: 0;
    margin-bottom: 30px;
`;

export const ReservationItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #f0f0f0;
    transition: background 0.2s;

    &:hover {
        background-color: #fafafa;
    }

    .info {
        .time {
            font-weight: bold;
            color: #3b82f6;
            margin-right: 10px;
        }

        .name {
            font-weight: 500;
        }
    }
`;

export const BlockButton = styled.button`
    width: 100%;
    padding: 15px;
    background-color: #ff4d4f;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.8;
    }
`;

export const CancelButton = styled.button`
    padding: 6px 12px;
    background: #fff;
    border: 1px solid #ff4d4f;
    color: #ff4d4f;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;

    &:hover {
        background: #ff4d4f;
        color: #fff;
    }
`;

export const AdminTitle = styled.h2`
    font-size: 28px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
`;

export const DetailTitle = styled.h3`
    font-size: 20px;
    color: #555;
    margin-bottom: 10px;
`;

export const Divider = styled.hr`
    border: 0;
    height: 1px;
    background: #eee;
    margin-bottom: 20px;
`;

export const TimeText = styled.span`
    font-size: 18px;
    font-weight: bold;
    color: #ff8982; // 캘린더 포인트 컬러와 맞춤
    margin-right: 15px;
`;

export const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const UserName = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: #333;
`;

export const MenuName = styled.div`
    font-size: 12px;
    color: #888;
`;

export const EmptyMessage = styled.p`
    color: #999;
    text-align: center;
    margin-top: 40px;
    font-size: 15px;
`;
