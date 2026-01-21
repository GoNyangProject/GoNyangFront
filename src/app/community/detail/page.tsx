'use client';
import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    BoardCardWrapper,
    ButtonWrapper,
    CommentInputWrapper,
    CommentListWrapper,
    DetailBody,
    DetailContainer,
    DetailContent,
    DetailHeader,
    DetailImageBox,
    DetailMeta,
    DetailTitle,
    DetailTitleWrapper,
    DetailUpdateWrapper,
} from '../../../../styles/pages/menu/Board';
import axiosInstance from '../../../../libs/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Post } from '../../../../service/crud';
import Button from '../../../../components/atom/Button';
import { MainWrapper } from '../../../../styles/pages/Main';
import { userStore } from '../../../../store/userStore';
import { BoardType } from '../../../../enum/BoardType';

const fetcher = (payload: Request) => axiosInstance.post('/api/backend', payload).then((res) => res.data.result);

const Page = () => {
    const router = useRouter();
    // const test = "<p>안녕하세요!</p><img src='https://s3.../photo1.jpg' /><p>오늘의 사진입니다.</p>";
    const params = useSearchParams();
    const boardId = params.get('community');

    const [comment, setComment] = useState<string>();

    const { userData } = userStore();

    const { data: community_detail_data, isLoading } = useSWR(
        boardId
            ? {
                  url: `/board/detail?boardCode=${11}`,
                  method: 'GET',
              }
            : null,
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        },
    );

    const { data: comment_data } = useSWR(
        boardId
            ? {
                  url: `/comment?boardId=${boardId}`,
                  method: 'GET',
              }
            : null,
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        },
    );

    const handleClickLike = () => {
        const payload = {
            boardId: 11,
        };
        Post(
            '/board/like',
            payload,
            () => {
                mutate(
                    { url: `/board/detail?boardCode=${11}`, method: 'GET' },
                    {
                        ...community_detail_data,
                        likeCount: (community_detail_data.likeCount || 0) + 1,
                    },
                    false,
                );
            },
            false,
        );
    };

    const handleCommentSubmit = () => {
        if (!userData) {
            alert('로그인 후 이용해주세요');
            router.push('/memebr/login');
            return;
        }
        const payload = {
            memberId: userData.memberId,
            boardCode: BoardType.COMMUNITY,
            content: comment,
        };

        Post(
            '/comment',
            payload,
            (response) => {
                if (response.type === 'SUCCESS') {
                    mutate({ url: `/comment?boardId=${boardId}`, method: 'GET' }, false);
                }
            },
            false,
        );
    };

    if (isLoading) return <BoardCardWrapper>로딩 중...</BoardCardWrapper>;
    if (!community_detail_data) return <BoardCardWrapper>데이터를 찾을 수 없습니다.</BoardCardWrapper>;

    return (
        <MainWrapper>
            <BoardCardWrapper style={{ padding: '40px 0' }}>
                <DetailContainer>
                    <DetailHeader>
                        <DetailTitleWrapper>
                            <DetailTitle>{community_detail_data.title || '제목이 없습니다.'}</DetailTitle>
                            {userData?.memberId === community_detail_data.member.memberId ? (
                                <DetailUpdateWrapper>
                                    <Button style={{ padding: '10px 24px', fontSize: '15px' }}>수정</Button>
                                    <Button
                                        style={{
                                            padding: '10px 24px',
                                            fontSize: '15px',
                                            backgroundColor: '#a68967',
                                        }}
                                    >
                                        삭제
                                    </Button>
                                </DetailUpdateWrapper>
                            ) : (
                                ''
                            )}
                        </DetailTitleWrapper>
                        <DetailMeta>
                            <span>작성일: {community_detail_data.createdAt?.split('T')[0]}</span>
                            <div className="divider" />
                            <span>작성자: 관리자</span>
                            <div className="divider" />
                            <span>조회수: {community_detail_data.viewCount || 0}</span>
                            <div className="divider" />
                            <span onClick={handleClickLike} style={{ cursor: 'pointer' }}>
                                <FontAwesomeIcon style={{ color: 'red' }} icon={faHeart} /> 좋아요: {community_detail_data.likeCount || 0}
                            </span>
                        </DetailMeta>
                    </DetailHeader>
                    <DetailBody>
                        {community_detail_data.imgUrl ? (
                            <DetailImageBox>
                                <img src={`${community_detail_data.imgUrl}`} alt={community_detail_data.id} />
                            </DetailImageBox>
                        ) : (
                            ''
                        )}
                        <DetailContent>{community_detail_data.content || '내용이 없습니다.'}</DetailContent>
                    </DetailBody>
                    <CommentInputWrapper>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="댓글을 입력해주세요."
                            style={{
                                width: '100%',
                                height: '80px',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                resize: 'none',
                            }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Button onClick={handleCommentSubmit} style={{ padding: '8px 20px', whiteSpace: 'nowrap' }}>
                                등록
                            </Button>
                        </div>
                    </CommentInputWrapper>
                    <ButtonWrapper>
                        <CommentListWrapper>
                            {comment_data && comment_data.length > 0 ? (
                                // 재귀 함수를 Page 안에서 즉시 정의해서 사용
                                (function renderComments(items: any[], depth = 0) {
                                    return items.map((item) => (
                                        <div
                                            key={item.id}
                                            style={{
                                                marginLeft: depth > 0 ? `${depth * 20}px` : '0',
                                                paddingLeft: depth > 0 ? '15px' : '0',
                                                borderLeft: depth > 0 ? '2px solid #f0f0f0' : 'none',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <span
                                                        style={{
                                                            fontWeight: 'bold',
                                                            fontSize: '14px',
                                                        }}
                                                    >
                                                        {item.username || '익명'}
                                                    </span>
                                                    <span
                                                        style={{
                                                            fontSize: '12px',
                                                            color: '#999',
                                                        }}
                                                    >
                                                        {item.createdAt?.split('T')[0]}
                                                    </span>
                                                </div>
                                                <button
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        color: '#a68967',
                                                        cursor: 'pointer',
                                                        fontSize: '12px',
                                                    }}
                                                >
                                                    답글
                                                </button>
                                            </div>

                                            {/* 댓글 본문 */}
                                            <div
                                                style={{
                                                    marginTop: '8px',
                                                    fontSize: '15px',
                                                    color: '#333',
                                                    lineHeight: '1.5',
                                                }}
                                            >
                                                {item.content}
                                            </div>

                                            {/* 대댓글이 있으면 재귀 호출 */}
                                            {item.children && item.children.length > 0 && (
                                                <div style={{ marginTop: '20px' }}>{renderComments(item.children, depth + 1)}</div>
                                            )}
                                        </div>
                                    ));
                                })(comment_data)
                            ) : (
                                <div style={{ textAlign: 'center', color: '#bbb', padding: '50px 0' }}>등록된 댓글이 없습니다.</div>
                            )}
                        </CommentListWrapper>
                        <Button style={{ padding: '10px 24px', fontSize: '15px' }} onClick={() => router.push('/community')}>
                            목록으로
                        </Button>
                    </ButtonWrapper>
                </DetailContainer>
            </BoardCardWrapper>
        </MainWrapper>
        /*
            <div dangerouslySetInnerHTML={{__html: test}}/>
        */
    );
};

export default Page;
