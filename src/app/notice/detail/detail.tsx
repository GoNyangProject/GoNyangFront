'use client';
import React, { useEffect } from 'react';
import axiosInstance from '../../../../libs/axios';
import { useRouter, useSearchParams } from 'next/navigation';
import useSWR, { mutate } from 'swr';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
    BoardCardWrapper,
    ButtonWrapper,
    DetailBody,
    DetailContainer,
    DetailContent,
    DetailHeader,
    DetailImageBox,
    DetailMeta,
    DetailTitle,
} from '../../../../styles/pages/menu/Board';
import { MainWrapper } from '../../../../styles/pages/Main';
import Button from '../../../../components/atom/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { Post } from '../../../../service/crud';
import { userStore } from '../../../../store/userStore'; // 스타일 경로 확인 필요

const fetcher = (payload: Request) => axiosInstance.post('/api/backend', payload).then((res) => res.data.result);

const NoticeDetail = () => {
    const params = useSearchParams();
    const router = useRouter();
    const boardId = params.get('notice');
    const { userData } = userStore();
    const { data: notice_detail_data, isLoading } = useSWR(
        boardId
            ? {
                  url: `/board/detail?boardCode=${boardId}&userId=${userData?.userId}`,
                  method: 'GET',
              }
            : null,
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            fallbackData: [],
        },
    );
    const handleClickLike = () => {
        if (!userData) return alert('로그인이 필요합니다.');
        const isCurrentlyLiked = notice_detail_data.liked;
        const payload = {
            boardId: boardId,
        };
        Post(
            '/boardLike',
            payload,
            () => {
                mutate(
                    { url: `/board/detail?boardCode=${boardId}&userId=${userData?.userId}`, method: 'GET' },
                    {
                        ...notice_detail_data,
                        liked: !isCurrentlyLiked,
                        likeCount: isCurrentlyLiked ? (notice_detail_data.likeCount || 1) - 1 : (notice_detail_data.likeCount || 0) + 1,
                    },
                    false,
                );
            },
            false,
        );
    };

    useEffect(() => {
        console.log(notice_detail_data);
    }, [notice_detail_data]);

    if (isLoading) return <BoardCardWrapper>로딩 중...</BoardCardWrapper>;
    if (!notice_detail_data) return <BoardCardWrapper>데이터를 찾을 수 없습니다.</BoardCardWrapper>;

    return (
        <MainWrapper>
            <BoardCardWrapper style={{ padding: '40px 0' }}>
                <DetailContainer>
                    <DetailHeader>
                        <DetailTitle>{notice_detail_data.title || '제목이 없습니다.'}</DetailTitle>
                        <DetailMeta>
                            <span>작성일: {notice_detail_data.createdAt?.split('T')[0]}</span>
                            <div className="divider" />
                            <span>작성자: 관리자</span>
                            <div className="divider" />
                            <span>조회수: {notice_detail_data.viewCount || 0}</span>
                            <div className="divider" />
                            <span onClick={handleClickLike} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <FontAwesomeIcon style={{ color: 'red' }} icon={(notice_detail_data.liked ? fasHeart : farHeart) as IconProp} />
                                <span>좋아요 {notice_detail_data.likeCount || 0}</span>
                            </span>
                        </DetailMeta>
                    </DetailHeader>
                    <DetailBody>
                        {notice_detail_data.imgUrl ? (
                            <DetailImageBox>
                                <img src={`${notice_detail_data.imgUrl}`} alt={notice_detail_data.id} />
                            </DetailImageBox>
                        ) : (
                            ''
                        )}
                        <DetailContent>{notice_detail_data.content || '내용이 없습니다.'}</DetailContent>
                    </DetailBody>
                    <ButtonWrapper>
                        <Button style={{ padding: '10px 24px', fontSize: '15px' }} onClick={() => router.push('/notice')}>
                            목록으로
                        </Button>
                    </ButtonWrapper>
                </DetailContainer>
            </BoardCardWrapper>
        </MainWrapper>
    );
};

export default NoticeDetail;
