'use client';
import React, { useMemo, useState } from 'react';
import {
    AdminTitle,
    BlockButton,
    CalendarSection,
    CancelButton,
    Container,
    ContentWrapper,
    DetailSection,
    DetailTitle,
    Divider,
    EmptyMessage,
    MenuName,
    ReservationItem,
    ReservationList,
    TimeText,
    UserInfo,
    UserName,
} from '../../../../styles/pages/admin/reservation';
import DatePicker from '../../../../components/organisms/DatePicker';
import axiosInstance from '../../../../libs/axios';
import useSWR, { mutate } from 'swr';
import { formatDate } from '@/utils/validations/formValidators';
import { AdminBlockResponse, AdminBookResponse } from '../../../../types/Common';
import { Delete, Get, Patch, Post } from '../../../../service/crud';
import { ResponseType } from '../../../../enum/Common';
import PetInfoModal from '../../../../components/molecules/admin/PetInfoModal';

const fetcher = (payload: Request) => axiosInstance.post('/api/backend', payload).then((res) => res.data.result);
export interface PetInfo {
    id: number;
    petName: string;
    catBreed: string;
    petAge: number;
    petGender: string;
    catNotes: string;
    petImagePath: string | null;
    createdAt: string;
}

const Page = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserPets, setSelectedUserPets] = useState<PetInfo[]>([]);
    const [currentUserName, setCurrentUserName] = useState('');

    const { data: book_data } = useSWR<AdminBookResponse[]>(
        {
            url: `/admin/book/list`,
            method: 'GET',
        },
        fetcher,
        {
            revalidateOnFocus: true,
            fallbackData: [],
        },
    );
    const { data: block_data } = useSWR<AdminBlockResponse[]>(
        {
            url: `/admin/block/list`,
            method: 'GET',
        },
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        },
    );
    console.log(block_data);
    const handleCancel = (orderId: string) => {
        if (!confirm('정말 취소하시겠습니까?')) return;

        Patch(
            `/admin/book/${orderId}/cancel`,
            {},
            (res) => {
                if (res.type === ResponseType.SUCCESS) {
                    mutate({ url: `/admin/book/list`, method: 'GET' });
                    mutate({ url: `/admin/block/list`, method: 'GET' });
                }
            },
            false,
        );
    };

    const filteredBookings = useMemo(() => {
        if (!book_data || book_data.length === 0) return [];
        const selectedStr = formatDate(selectedDate);
        return book_data.filter((book: AdminBookResponse) => {
            const bookStr = formatDate(new Date(book.bookDate));
            return bookStr === selectedStr;
        });
    }, [book_data, selectedDate]);

    const sortedBookings = useMemo(() => {
        return [...filteredBookings].sort((a, b) => new Date(a.bookDate).getTime() - new Date(b.bookDate).getTime());
    }, [filteredBookings]);

    const isBlockedToday = useMemo(() => {
        const selectedStr = formatDate(selectedDate);
        const currentBlocks = block_data || [];
        return currentBlocks.some((b) => String(b.blockDate) === String(selectedStr));
    }, [block_data, selectedDate]);

    const handleBlockDay = () => {
        const dateStr = formatDate(selectedDate);

        const hasActiveBookings = filteredBookings.some((book) => !book.cancelled);

        const confirmMsg = hasActiveBookings
            ? `주의! 해당 날짜에 아직 취소되지 않은 예약이 ${filteredBookings.length}건 있습니다.\n그래도 예약을 차단하시겠습니까?`
            : `${dateStr}의 모든 예약을 차단하시겠습니까? (이후 유저 예약 불가)`;

        if (!confirm(confirmMsg)) return;
        const payload = { blockDate: dateStr, reason: '관리자 수동 차단' };
        Post(
            '/admin/block',
            payload,
            (response) => {
                if (response.message == '요청 성공') {
                    alert('차단 설정이 완료되었습니다.');
                    mutate({ url: `/admin/book/list`, method: 'GET' });
                    mutate({ url: `/admin/block/list`, method: 'GET' });
                } else {
                    alert('차단 처리 중 오류가 발생했습니다.');
                }
            },
            false,
        );
    };
    const handleUnblock = () => {
        const dateStr = formatDate(selectedDate);
        if (!confirm(`${dateStr}의 예약 차단을 해제하시겠습니까?`)) return;
        const payload = {};
        Delete(
            `/admin/block/${dateStr}`,
            payload,
            (response) => {
                if (response.message == '요청 성공') {
                    alert('차단이 해제되었습니다.');
                    mutate({ url: `/admin/block/list`, method: 'GET' });
                    mutate({ url: `/admin/book/list`, method: 'GET' });
                } else {
                    alert(response.message || '해제에 실패했습니다.');
                }
            },
            false,
        );
    };
    const handleUserClick = async (memberId: string, username: string) => {
        Get(`/admin/pet/list/${memberId}`, (response) => {
            console.log(response);
            if (response && Array.isArray(response.result)) {
                setSelectedUserPets(response.result || []);
                setCurrentUserName(username);
                setIsModalOpen(true);

                if (response.result.length === 0) {
                    console.log(`${username}님은 등록된 펫이 없습니다.`);
                }
            } else {
                alert(response.message || '정보를 불러올 수 없습니다.');
            }
        });
    };

    return (
        <Container>
            <AdminTitle>예약 통합 관리</AdminTitle>
            <ContentWrapper>
                <CalendarSection>
                    <DatePicker bookData={book_data || []} blockData={block_data || []} isAdmin={true} onDateChange={(date: Date) => setSelectedDate(date)} />
                </CalendarSection>

                <DetailSection>
                    <DetailTitle>
                        {selectedDate.toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}{' '}
                        현황
                    </DetailTitle>
                    <Divider />

                    <ReservationList>
                        {sortedBookings.length > 0 ? (
                            sortedBookings.map((book) => {
                                const isCancelled = book.cancelled;
                                return (
                                    <ReservationItem
                                        key={book.orderId}
                                        style={{
                                            opacity: isCancelled ? 0.5 : 1,
                                            backgroundColor: isCancelled ? '#f9f9f9' : 'white',
                                            cursor: isCancelled ? 'default' : 'pointer',
                                        }}
                                        onClick={() => handleUserClick(book.memberId, book.username)}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <TimeText>
                                                {new Date(book.bookDate).toLocaleTimeString('ko-KR', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: false,
                                                })}
                                            </TimeText>
                                            <UserInfo>
                                                <UserName>
                                                    {book.username} ({book.userPhone || '연락처 없음'})
                                                    {isCancelled && (
                                                        <span
                                                            style={{
                                                                color: 'red',
                                                                fontSize: '12px',
                                                                marginLeft: '8px',
                                                            }}
                                                        >
                                                            [취소됨]
                                                        </span>
                                                    )}
                                                </UserName>
                                                <MenuName>{book.menuName}</MenuName>
                                            </UserInfo>
                                        </div>

                                        {isCancelled ? (
                                            <span
                                                style={{
                                                    fontSize: '14px',
                                                    color: '#999',
                                                    fontWeight: 'bold',
                                                    marginRight: '10px',
                                                }}
                                            >
                                                처리완료
                                            </span>
                                        ) : (
                                            <CancelButton
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleCancel(book.orderId);
                                                }}
                                            >
                                                예약취소
                                            </CancelButton>
                                        )}
                                    </ReservationItem>
                                );
                            })
                        ) : (
                            <EmptyMessage>예약 내역이 없습니다. 🐾</EmptyMessage>
                        )}
                    </ReservationList>

                    <BlockButton
                        onClick={isBlockedToday ? handleUnblock : handleBlockDay}
                        style={{
                            backgroundColor: isBlockedToday ? '#888888' : '#000000',
                            cursor: isBlockedToday ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        {isBlockedToday ? `🔓 ${formatDate(selectedDate)} 차단 해제하기` : `🔒 ${formatDate(selectedDate)} 전체 예약 막기`}
                    </BlockButton>
                </DetailSection>
            </ContentWrapper>
            {isModalOpen && <PetInfoModal petList={selectedUserPets} userName={currentUserName} onClose={() => setIsModalOpen(false)} />}
        </Container>
    );
};

export default Page;
