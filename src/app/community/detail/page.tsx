'use client';
import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { useRouter, useSearchParams } from 'next/navigation';
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
import { CommentList } from '../../../../types/Common';
import {
    ActionGroup,
    ChildrenWrapper,
    CommentContent,
    CommentHeader,
    CommentInfo,
    CommentInputWrapper,
    CommentItemContainer,
    CommentListWrapper,
    ReplyInputBox,
} from '../../../../styles/pages/menu/Comment';

const fetcher = (payload: any) => axiosInstance.post('/api/backend', payload).then((res) => res.data.result);

const Page = () => {
    const router = useRouter();
    const params = useSearchParams();
    const boardId = params.get('community');

    const [comment, setComment] = useState<string>(''); // 메인 댓글용
    const [replyComment, setReplyComment] = useState<string>(''); // 대댓글용
    const [currentReplyId, setCurrentReplyId] = useState<number>(0); // 대댓글 입력창 열기용 ID

    const { userData } = userStore();

    // 1. 게시글 상세 정보 조회
    const { data: community_detail_data, isLoading } = useSWR(
        boardId
            ? {
                  url: `/board/detail?boardCode=${11}&userId=${userData?.userId}`,
                  method: 'GET',
              }
            : null,
        fetcher,
        { revalidateOnFocus: false, revalidateOnReconnect: false },
    );

    // 2. 댓글 목록 조회
    const { data: comment_data } = useSWR(
        boardId
            ? {
                  url: `/comment?boardId=${boardId}`,
                  method: 'GET',
              }
            : null,
        fetcher,
        { revalidateOnFocus: false, revalidateOnReconnect: false, fallbackData: [] },
    );

    const handleClickLike = () => {
        const payload = { boardId: 11 };
        Post(
            '/board/like',
            payload,
            () => {
                mutate({ url: `/board/detail?boardCode=${11}`, method: 'GET' });
            },
            false,
        );
    };

    const handleCommentSubmit = () => {
        if (!userData) {
            alert('로그인 후 이용해주세요');
            router.push('/member/login');
            return;
        }
        if (!comment.trim()) return alert('댓글 내용을 입력해주세요.');

        const payload = {
            memberId: userData.memberId,
            boardCode: BoardType.FREE_COMMUNITY,
            content: comment,
            parentId: currentReplyId ? currentReplyId : null, // 루트 댓글
        };

        Post(
            '/comment',
            payload,
            (response) => {
                if (response.type === 'SUCCESS') {
                    setComment(''); // 입력란 초기화
                    mutate({ url: `/comment?boardId=${boardId}`, method: 'GET' });
                }
            },
            false,
        );
    };

    const handleReplySubmit = (parentId: number) => {
        console.log(parentId);
        if (!userData) {
            alert('로그인 후 이용해주세요');
            router.push('/member/login');
            return;
        }
        if (!replyComment.trim()) return alert('답글 내용을 입력해주세요.');

        const payload = {
            memberId: userData.memberId,
            boardCode: BoardType.FREE_COMMUNITY,
            content: replyComment,
            parentId: parentId, // 부모 댓글 ID 전달
        };

        Post(
            '/comment',
            payload,
            (response) => {
                if (response.type === 'SUCCESS') {
                    setReplyComment(''); // 대댓글 입력란 초기화
                    setCurrentReplyId(0); // 입력창 닫기
                    mutate({ url: `/comment?boardId=${boardId}`, method: 'GET' });
                }
            },
            false,
        );
    };

    const handleClickReply = (item: CommentList) => {
        setReplyComment(''); // 기존에 쓰던 내용 지우기
        setCurrentReplyId(item.id === currentReplyId ? 0 : item.id); // 토글 방식
    };

    const handleClickDeleteReply = (item: CommentList) => {
        if (confirm('정말 삭제하시겠습니까?')) {
            const payload = {
                commentId: item.id,
            };
            Post(
                '/comment/delete',
                payload,
                (response) => {
                    if (response.type === 'SUCCESS') {
                        mutate({
                            url: `/comment?boardId=${boardId}`,
                            method: 'GET',
                        });
                    }
                },
                false,
            );
        }
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
                            {userData?.memberId === community_detail_data.member.memberId && (
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
                        {community_detail_data.imgUrl && (
                            <DetailImageBox>
                                <img src={`${community_detail_data.imgUrl}`} alt="board-img" />
                            </DetailImageBox>
                        )}
                        <DetailContent>{community_detail_data.content || '내용이 없습니다.'}</DetailContent>
                    </DetailBody>

                    {/* 메인 댓글 입력창 */}
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
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginTop: '10px',
                                alignItems: 'center',
                            }}
                        >
                            <Button onClick={handleCommentSubmit} style={{ padding: '8px 20px', whiteSpace: 'nowrap' }}>
                                등록
                            </Button>
                        </div>
                    </CommentInputWrapper>

                    <ButtonWrapper>
                        <CommentListWrapper>
                            {comment_data && comment_data.length > 0 ? (
                                (function renderComments(items: CommentList[], depth = 0) {
                                    return items.map((item: CommentList) => (
                                        <CommentItemContainer key={item.id} $depth={depth}>
                                            <CommentHeader>
                                                <CommentInfo>
                                                    <span className="writer">{item.writer || '익명'}</span>
                                                    <span className="date">{item.createdAt.toString().split('T')[0]}</span>
                                                </CommentInfo>
                                                <ActionGroup>
                                                    <Button onClick={() => handleClickDeleteReply(item)}>삭제</Button>
                                                    <Button onClick={() => handleClickReply(item)}>{currentReplyId === item.id ? '닫기' : '답글'}</Button>
                                                </ActionGroup>
                                            </CommentHeader>

                                            <CommentContent>{item.content}</CommentContent>

                                            {/* 대댓글 입력창 */}
                                            {currentReplyId === item.id && (
                                                <ReplyInputBox>
                                                    <textarea
                                                        value={replyComment}
                                                        onChange={(e) => setReplyComment(e.target.value)}
                                                        placeholder={`${item.writer}님께 답글 남기기...`}
                                                    />
                                                    <div className="button-group">
                                                        <Button
                                                            onClick={() => setCurrentReplyId(0)}
                                                            style={{
                                                                backgroundColor: '#999',
                                                                padding: '4px 12px',
                                                                fontSize: '12px',
                                                            }}
                                                        >
                                                            취소
                                                        </Button>
                                                        <Button onClick={() => handleReplySubmit(item.id)} style={{ padding: '4px 12px', fontSize: '12px' }}>
                                                            답글 등록
                                                        </Button>
                                                    </div>
                                                </ReplyInputBox>
                                            )}

                                            {/* 대댓글 재귀 호출 */}
                                            {item.children && item.children.length > 0 && (
                                                <ChildrenWrapper>{renderComments(item.children, depth + 1)}</ChildrenWrapper>
                                            )}
                                        </CommentItemContainer>
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
    );
};

export default Page;
