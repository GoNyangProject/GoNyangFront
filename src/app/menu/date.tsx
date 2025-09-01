import React, { useEffect, useState } from 'react';
import { Menu, Menu as MenuComponent } from '../../../types/Common';
import { MenuType } from '../../../enum/Menu';
import Button from '../../../components/atom/Button';
import DatePicker from '../../../components/organisms/DatePicker';
import CalendarDialog from '../../../components/organisms/dialog/CalendarDialog';
import { DateWrapper, DetailsRow, Price, Rating, ServiceCard, ServiceDescription, ServiceName } from '../../../styles/pages/menu/Menu';
import { useDialogStore } from '../../../store/dialogStore';
import useSWR from 'swr';
import axiosInstance from '../../../libs/axios';

interface MenuProps {
    setCurrentTab: React.Dispatch<React.SetStateAction<MenuType>>;
    selectedMenu: Menu | undefined;
    setSelectedMenu: React.Dispatch<React.SetStateAction<MenuComponent | undefined>>;
}

const fetcher = (payload: Request) => axiosInstance.post('/api/backend', payload).then((res) => res.data.result);

const BookMenu = ({ selectedMenu, setCurrentTab }: MenuProps) => {
    const { selectedDate } = useDialogStore();
    const [currentDate, setCurrentDate] = useState<string>();
    useEffect(() => {
        if (selectedDate) {
            console.log(selectedDate);
            const year = selectedDate.getFullYear();
            const month = selectedDate.getMonth() + 1;
            const format_month = month < 10 ? `0${month}` : `${month}`;
            setCurrentDate(`${year}-${format_month}`);
        }
    }, [selectedDate]);

    useEffect(() => {
        console.log(currentDate);
    }, [currentDate]);

    const { data: book_data } = useSWR(
        {
            url: `/menu/date?date=${currentDate}`,
            method: 'GET',
        },
        fetcher,
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            fallbackData: '',
        },
    );

    const handleClickPrevious = () => {
        setCurrentTab(MenuType.MENU);
    };

    const handleClickNext = () => {
        setCurrentTab(MenuType.PAY_CONFIRM);
    };

    const renderStars = (score: number | undefined) => {
        if (!score) {
            return;
        }
        const fullStars = Math.floor(score); // 정수 부분 (예: 4.2 -> 4)
        const remainingStars = 5 - fullStars; // 빈 별의 개수 (예: 5 - 4 = 1)

        const stars = [];
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <span key={`full-${i}`} style={{ color: '#f7b731' }}>
                    ★
                </span>,
            );
        }
        for (let i = 0; i < remainingStars; i++) {
            stars.push(
                <span key={`empty-${i}`} style={{ color: '#ccc' }}>
                    ☆
                </span>,
            );
        }
        return stars;
    };

    return (
        <DateWrapper>
            <ServiceCard style={{ flexDirection: 'column' }}>
                <ServiceName>{selectedMenu?.menuName}</ServiceName>
                <ServiceDescription>{selectedMenu?.content}</ServiceDescription>
                <DetailsRow>
                    <Rating>
                        <div>{renderStars(selectedMenu?.score)}</div>
                        {selectedMenu?.score}
                    </Rating>
                    <Price>{selectedMenu?.price.toLocaleString()} 원</Price>
                </DetailsRow>
            </ServiceCard>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <DatePicker />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <Button onClick={handleClickPrevious}>이전</Button>
                <Button onClick={handleClickNext}>다음</Button>
            </div>
            <CalendarDialog />
        </DateWrapper>
    );
};

export default BookMenu;
