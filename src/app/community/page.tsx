'use client';
import React, { useState } from 'react';
import {
    BoardTitle,
    CategoryItem,
    CategoryList,
    CommunityContainer,
    CommunityWrapper,
    MainSection,
    PostListWrapper,
    SectionHeader,
    SideBar,
    SideTitle,
    WriteButton,
} from '../../../styles/pages/community/Community';
import InquiryTable from '../../../components/atom/InquiryTable';
import { communityColumns } from '../../../constants/table-init';
import useSWR from 'swr';
import axiosInstance from '../../../libs/axios';
import { BoardResponseDTO } from '../../../types/Common';
import { BoardType } from '../../../enum/BoardType';
import { getCookie } from '@/utils/cookie';
import { router } from 'next/client';
import Pagination from "../../../components/molecules/Pagination";

const fetcher = (payload: Request) => axiosInstance.post('/api/backend', payload).then((res) => res.data.result);
const Page = () => {
    const [category, setCategory] = useState('자유게시판');
    const [page, setPage] = useState(1);
    const [boardType, setBoardType] = useState<BoardType>(BoardType.FREE_COMMUNITY);
    const size = 10;
    const hasToken = getCookie('accessToken');
    const { data: communityList } = useSWR(
        {
            url: `/community/list?&page=${page - 1}&size=10&boardCode=${boardType}`,
            method: 'GET',
        },
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        },
    );
    const handleRenderCustomCell = (key: string, row: BoardResponseDTO, rowIndex: number) => {
        if (key === 'displayId') {
            const total = communityList?.totalElements || 0;
            return <span>{total - (page - 1) * size - rowIndex}</span>;
        }
        if (key === 'createdAt') {
            return <span>{row.createdAt?.split('T')[0]}</span>;
        }
        return undefined;
    };
    const handleClickInfo = () => {
        setCategory('정보공유');
        setBoardType(BoardType.INFO);
        setPage(1);
    };
    const handleClickFree = () => {
        setCategory('자유게시판');
        setBoardType(BoardType.FREE_COMMUNITY);
        setPage(1);
    };
    const handleClickFleaMarket = () => {
        setCategory('나눔장터');
        setBoardType(BoardType.FLEA_MARKET);
        setPage(1);
    };
    const row = communityList?.boards || [];
    const totalPages = communityList?.totalPages || 0;
    return (
        <CommunityWrapper>
            <CommunityContainer>
                {/* 좌측 메뉴 */}
                <SideBar>
                    <SideTitle>커뮤니티</SideTitle>
                    <CategoryList>
                        <CategoryItem $active={category === '자유게시판'} onClick={handleClickFree}>
                            자유게시판
                        </CategoryItem>
                        <CategoryItem $active={category === '정보공유'} onClick={handleClickInfo}>
                            정보공유
                        </CategoryItem>
                        <CategoryItem $active={category === '나눔장터'} onClick={handleClickFleaMarket}>
                            나눔장터
                        </CategoryItem>
                    </CategoryList>
                </SideBar>

                {/* 우측 게시판 */}
                <MainSection>
                    <SectionHeader>
                        <BoardTitle>{category}</BoardTitle>
                        {hasToken && <WriteButton onClick={() => router.push('/community/write')}>글쓰기</WriteButton>}
                    </SectionHeader>

                    <PostListWrapper>
                        {row.length > 0 ? (
                            <InquiryTable columns={communityColumns} rows={row} renderCustomCell={handleRenderCustomCell} />
                        ) : (
                            <div style={{ textAlign: 'center', color: '#888', paddingTop: '100px' }}>아직 게시글이 없습니다. 첫 글을 남겨보세요! 🐾</div>
                        )}
                        <Pagination currentPage={page} totalPage={totalPages} changePage={(newPage) => setPage(newPage)} />
                    </PostListWrapper>
                </MainSection>
            </CommunityContainer>
        </CommunityWrapper>
    );
};

export default Page;
