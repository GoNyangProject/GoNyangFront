'use client';
import React, { useMemo } from 'react';
import { userStore } from '../../../../store/userStore';
import useSWR from 'swr';
import axiosInstance from '../../../../libs/axios';
import { Book } from '../../../../types/Common';
import { BookContent, BookControlls, BookMenuLogo, BookWrapper, MypageTitle } from '../../../../styles/pages/mypage/Mypage';
import Button from '../../../../components/atom/Button';

const fetcher = (payload: Request) => axiosInstance.post('/api/backend', payload).then((res) => res.data.result);

const Page = () => {
    const { userData } = userStore();

    const { data: book_data } = useSWR(
        {
            url: `/book?memberId=${userData.memberId}`,
            method: 'GET',
        },
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            fallbackData: [],
        },
    );

    const bookContentRows = useMemo(() => {
        if (!book_data) {
            return;
        }
        return book_data.map((book: Book) => {
            const date = new Date(book.bookDate); // 서버에서 받은 문자열
            const formattedDate =
                `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ` +
                `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;

            return {
                username: book.username,
                menuName: book.menuName,
                content: book.content,
                bookDate: formattedDate,
            };
        });
    }, [book_data]);

    const handleClickDetails = () => {
        alert('개발중입니다');
        return;
    };

    return (
        <div
            style={{
                width: '40%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '20px',
                gap: '15px',
            }}
        >
            <MypageTitle>예약정보</MypageTitle>
            {bookContentRows.map((book: Book, index: number) => (
                <BookWrapper key={index}>
                    <BookMenuLogo />
                    <BookContent>
                        <div>예약자명 : {book.username}</div>
                        <div>예약날짜 : {book.bookDate}</div>
                        <div>시술명 : {book.menuName}</div>
                        <div>내용 : {book.content}</div>
                    </BookContent>
                    <BookControlls>
                        <Button onClick={handleClickDetails}>상세보기</Button>
                    </BookControlls>
                </BookWrapper>
            ))}
        </div>
    );
};

export default Page;
