'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { userStore } from '../../../../store/userStore';
import useSWR from 'swr';
import axiosInstance from '../../../../libs/axios';
import {
    BookContent,
    BookControlls,
    BookHeader,
    BookItemWrapper,
    BookMainWrapper,
    BookMenuLogo,
    BookWrapper,
    MypageTitle,
} from '../../../../styles/pages/mypage/Mypage';
import Button from '../../../../components/atom/Button';
import { Book } from '../../../../types/Common';
import Input from '../../../../components/atom/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useDialogStore } from '../../../../store/dialogStore';
import { DialogType } from '../../../../enum/Dialog';
import BookDetailDialog from '../../../../components/organisms/dialog/BookDetailDialog';

const fetcher = (payload: Request) => axiosInstance.post('/api/backend', payload).then((res) => res.data.result);

const Page = () => {
    const { userData } = userStore();
    const [search, setSearch] = useState<string>('');
    const { openDialog, closeDialog, setSelectedBook } = useDialogStore();

    useEffect(() => {
        closeDialog(DialogType.BOOK_DETAIL);
    }, []);

    const { data: book_data } = useSWR(
        {
            url: `/mypage/book?memberId=${userData?.memberId}`,
            method: 'GET',
        },
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            fallbackData: [],
        },
    );

    const groupedBooks = useMemo(() => {
        if (!book_data) {
            return {};
        }

        const filteredData = book_data.filter((book: Book) => {
            const searchLower = search.toLowerCase();

            return Object.values(book).some((value) => value.toLowerCase().includes(searchLower));
        });

        return filteredData.reduce((acc, book: Book) => {
            const date = new Date(book.bookDate);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const key = `${year}-${String(month).padStart(2, '0')}`;

            if (!acc[key]) {
                acc[key] = [];
            }

            acc[key].push({
                orderId: book.orderId,
                username: book.username,
                menuName: book.menuName,
                content: book.content,
                bookDate: book.bookDate,
                price: book.price,
                deletedAt: book.deletedAt,
            });

            return acc;
        }, {});
    }, [book_data, search]);

    const sortedMonths = useMemo(() => {
        return Object.keys(groupedBooks).sort().reverse(); // 최근 월부터 정렬
    }, [groupedBooks]);

    const handleClickDetails = (book: Book) => {
        setSelectedBook(book);
        openDialog(DialogType.BOOK_DETAIL);
        // alert('개발중입니다');
        // return;
    };

    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '20px',
                gap: '15px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    border: '1px solid bisque',
                    borderRadius: '5px',
                    width: '100%',
                    alignItems: 'center',
                }}
            >
                <Input
                    style={{
                        backgroundColor: 'white',
                        padding: '5px 10px',
                        border: 'none',
                        fontSize: '20px',
                        boxShadow: 'none',
                    }}
                    width="100%"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    placeholder="검색어를 입력해주세요"
                />
                <FontAwesomeIcon icon={faMagnifyingGlass} color="gray" cursor="pointer" style={{ padding: '5px' }} />
            </div>
            <MypageTitle>예약정보</MypageTitle>

            {sortedMonths.length === 0 ? (
                <p>예약 정보가 없습니다.</p>
            ) : (
                sortedMonths.map((monthKey) => (
                    <BookWrapper key={monthKey}>
                        <BookHeader>
                            {monthKey.substring(0, 4)}년 {monthKey.substring(5, 7)}월 예약
                        </BookHeader>
                        {groupedBooks[monthKey].map((book: Book, index: number) => (
                            <BookItemWrapper key={index}>
                                <BookMainWrapper>
                                    <BookMenuLogo />
                                    <BookContent>
                                        {book.deletedAt ? (
                                            <div
                                                style={{
                                                    backgroundColor: 'bisque',
                                                    borderRadius: '10px',
                                                    padding: '2px 5px',
                                                }}
                                            >
                                                취소됨
                                            </div>
                                        ) : (
                                            ''
                                        )}

                                        <div>예약자명 : {book.username}</div>
                                        <div>예약일시 : {book.bookDate}</div>
                                        {/*<div>시술명 : {book.menuName}</div>*/}
                                    </BookContent>
                                    <BookControlls>
                                        <Button
                                            style={{
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                                overflow: 'hidden',
                                            }}
                                            onClick={() => handleClickDetails(book)}
                                        >
                                            상세보기
                                        </Button>
                                    </BookControlls>
                                </BookMainWrapper>
                            </BookItemWrapper>
                        ))}
                    </BookWrapper>
                ))
            )}
            <BookDetailDialog />
        </div>
    );
};

export default Page;
