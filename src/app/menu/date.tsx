'use client';
import React, { useEffect, useState } from 'react';
import { BookInfo, Menu } from '../../../types/Common';
import { MenuType } from '../../../enum/Menu';
import DatePicker from '../../../components/organisms/DatePicker';
import CalendarDialog from '../../../components/organisms/dialog/CalendarDialog';
import {
    ButtonContainer,
    DateWrapper,
    DetailsRow,
    NextButton,
    PreviousButton,
    Price,
    Rating,
    ServiceCard,
    ServiceDescription,
    ServiceName,
} from '../../../styles/pages/menu/Menu';
import { useDialogStore } from '../../../store/dialogStore';
import useSWR from 'swr';
import axiosInstance from '../../../libs/axios';
import { formatMonth } from '@/utils/validations/formValidators';

interface MenuProps {
    setCurrentTab: React.Dispatch<React.SetStateAction<MenuType>>;
    selectedMenu: Menu | undefined;
    setBookInfo: React.Dispatch<React.SetStateAction<BookInfo | undefined>>;
}

const fetcher = (payload: Request) => axiosInstance.post('/api/backend', payload).then((res) => res.data.result);

const today = formatMonth(new Date());
const BookMenu = ({ selectedMenu, setCurrentTab, setBookInfo }: MenuProps) => {
    const { selectedDate } = useDialogStore();
    const [currentDate, setCurrentDate] = useState<Date>(today as Date);
    useEffect(() => {
        if (selectedDate) {
            const date = formatMonth(selectedDate);
            setCurrentDate(date as Date);
        }
    }, [selectedDate]);

    const { data: book_data } = useSWR(
        {
            url: `/menu/month?date=${currentDate}`,
            method: 'GET',
        },
        fetcher,
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            fallbackData: '',
        },
    );
    const { data: block_data } = useSWR(
        {
            url: `/admin/block/list`,
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
        alert('예약하실 시간을 선택해주세요.');
        return;
        // setCurrentTab(MenuType.PAY_CONFIRM);
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
                <DatePicker bookData={book_data} blockData={block_data || []} isAdmin={false} />
            </div>
            <ButtonContainer>
                <PreviousButton onClick={handleClickPrevious}>이전</PreviousButton>
                <NextButton onClick={handleClickNext}>다음</NextButton>
            </ButtonContainer>
            <CalendarDialog bookData={book_data} setCurrentTab={setCurrentTab} selectedMenu={selectedMenu} setBookInfo={setBookInfo} />
        </DateWrapper>
    );
};

export default BookMenu;
