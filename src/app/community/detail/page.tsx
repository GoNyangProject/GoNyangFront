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
    CommentItemContainer,
    CommentListWrapper,
} from '../../../../styles/pages/menu/Comment';
import CommentInput from '../../../../components/molecules/CommentInput';

const fetcher = (payload: any) => axiosInstance.post('/api/backend', payload).then((res) => res.data.result);

const Page = () => {
    const router = useRouter();
    const params = useSearchParams();
    const boardId = params.get('community');
    const { userData } = userStore();

    const [currentReplyId, setCurrentReplyId] = useState<number>(0);
    const detailKey = boardId
        ? {
              url: `/board/detail?boardCode=${boardId}&userId=${userData?.userId}`,
              method: 'GET',
          }
        : null;

    const { data: community_detail_data, isLoading } = useSWR(detailKey, fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    // 3. 댓글 목록 조회
    const commentKey = boardId
        ? {
              url: `/comment?boardId=${boardId}`,
              method: 'GET',
          }
        : null;

    const { data: comment_data } = useSWR(commentKey, fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        fallbackData: [],
    });

    const handleClickLike = () => {
        Post(
            '/board/like',
            { boardId: boardId },
            () => {
                mutate(detailKey); // 저장해둔 키 변수 사용
            },
            false,
        );
    };

    const handleCommentSubmit = (content: string) => {
        if (!userData) {
            alert('로그인 후 이용해주세요');
            router.push('/member/login');
            return;
        }

        const payload = {
            memberId: userData.memberId,
            boardId: boardId,
            content: comment,
            parentId: currentReplyId ? currentReplyId : null, // 루트 댓글
        };

        Post(
            '/comment',
            payload,
            (response) => {
                if (response.type === 'SUCCESS') {
                    mutate(commentKey);
                }
            },
            false,
        );
    };

    const handleReplySubmit = (content: string, parentId: number) => {
        if (!userData) {
            alert('로그인 후 이용해주세요');
            // router.push('/member/login');
            return;
        }

        const payload = {
            memberId: userData.memberId,
            boardCode: BoardType.FREE_COMMUNITY,
            content: content,
            parentId: parentId,
        };

        Post(
            '/comment',
            payload,
            (response) => {
                if (response.type === 'SUCCESS') {
                    setCurrentReplyId(0);
                    mutate(commentKey);
                }
            },
            false,
        );
    };

    const handleClickDeleteReply = (item: CommentList) => {
        if (confirm('정말 삭제하시겠습니까?')) {
            Post(
                '/comment/delete',
                { commentId: item.id },
                (response) => {
                    if (response.type === 'SUCCESS') {
                        mutate(commentKey);
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
                            <DetailTitle>{community_detail_data.title}</DetailTitle>
                            {userData?.memberId === community_detail_data.member.memberId && (
                                <DetailUpdateWrapper>
                                    <Button onClick={() => router.push(`/community/write?boardId=${boardId}`)}>수정</Button>
                                    <Button style={{ backgroundColor: '#a68967' }}>삭제</Button>
                                </DetailUpdateWrapper>
                            )}
                        </DetailTitleWrapper>
                        <DetailMeta>
                            <span>작성일: {community_detail_data.createdAt?.split('T')[0]}</span>
                            <div className="divider" />
                            <span>작성자: {community_detail_data.member.userId}</span>
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
                                <img src={community_detail_data.imgUrl} alt="board-img" />
                            </DetailImageBox>
                        )}
                        <DetailContent className="view-content" dangerouslySetInnerHTML={{ __html: community_detail_data.content }} />
                    </DetailBody>

                    <CommentInput onSubmit={handleCommentSubmit} />

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
                                                    <Button onClick={() => setCurrentReplyId(currentReplyId === item.id ? 0 : item.id)}>
                                                        {currentReplyId === item.id ? '닫기' : '답글'}
                                                    </Button>
                                                </ActionGroup>
                                            </CommentHeader>
                                            <CommentContent>{item.content}</CommentContent>

                                            {currentReplyId === item.id && (
                                                <div style={{ marginTop: '10px' }}>
                                                    <CommentInput
                                                        onSubmit={(content) => handleReplySubmit(content, item.id)}
                                                        placeholder={`${item.writer}님께 답글 남기기...`}
                                                    />
                                                </div>
                                            )}

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
