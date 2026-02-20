'use client';
import React, { useState } from 'react';
import {
    BoardTitle,
    CategoryItem,
    CategoryList,
    CommunityContainer,
    CommunityWrapper,
    FilterGroup,
    HeaderLeftGroup,
    HeaderRightGroup,
    MainSection,
    PostListWrapper,
    SearchAndFilterRow,
    SearchInputWrapper,
    SectionHeader,
    SideBar,
    SideTitle,
    WriteButton,
} from '../../../styles/pages/community/Community';
import InquiryTable from '../../../components/atom/InquiryTable';
import { communityColumns } from '../../../constants/table-init';
import useSWR from 'swr';
import axiosInstance from '../../../libs/axios';
import { BoardInfo, BoardResponseDTO } from '../../../types/Common';
import { BoardType } from '../../../enum/BoardType';
import { getCookie } from '@/utils/cookie';
import Pagination from '../../../components/molecules/Pagination';
import { useRouter } from 'next/navigation';
import Input from '../../../components/atom/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import DropDawnFilter from '../../../components/molecules/admin/DropDawnFilter';
import { COMMUNITY_SORT_OPTION } from '../../../data/data-init';
import { timeAgo } from '@/utils/timeCell';

const fetcher = (payload: Request) => axiosInstance.post('/api/backend', payload).then((res) => res.data.result);

const Page = () => {
    const router = useRouter();
    const [category, setCategory] = useState('자유게시판');
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [boardType, setBoardType] = useState<BoardType>(BoardType.FREE_COMMUNITY);
    const size = 10;
    const hasToken = getCookie('accessToken');
    const { data: communityList } = useSWR(
        {
            url: `/community/list?&page=${page - 1}&size=10&boardCode=${boardType}&search=${search}&sort=${sortOption}`,
            method: 'GET',
        },
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            fallbackData: [],
        },
    );

    const handleRenderCustomCell = (key: string, row: BoardResponseDTO, rowIndex: number) => {
        if (key === 'displayId') {
            return <span>{(page - 1) * size + rowIndex + 1}</span>;
        }
        if (key === 'createdAt') {
            return <span style={{ fontSize: '12px', color: '#888' }}>{timeAgo(row.createdAt)}</span>;
        }
        if (key === 'userId') {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <div
                        style={{
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {row.userId}
                    </div>
                    <span className="mobile-only-time" style={{ fontSize: '10px', color: '#999', marginTop: '2px' }}>
                        {timeAgo(row.createdAt)}
                    </span>
                </div>
            );
        }
        if (key === 'viewCount') {
            return <span style={{ display: 'block', width: '100%', textAlign: 'center' }}>{row.viewCount}</span>;
        }
        return undefined;
    };
    const handleClickInfo = () => {
        setCategory('정보공유');
        setSearch('');
        setSearchInput('');
        setSortOption('');
        setBoardType(BoardType.INFO);
        setPage(1);
    };
    const handleClickFree = () => {
        setCategory('자유게시판');
        setSearch('');
        setSearchInput('');
        setSortOption('');
        setBoardType(BoardType.FREE_COMMUNITY);
        setPage(1);
    };
    const handleClickFleaMarket = () => {
        setCategory('나눔장터');
        setSearch('');
        setSearchInput('');
        setSortOption('');
        setBoardType(BoardType.FLEA_MARKET);
        setPage(1);
    };
    const handleOptionChange = (val: string) => {
        setSortOption(val);
        setPage(1);
    };
    const handleSearch = () => {
        setSearch(searchInput);
        setPage(1);
    };
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleClickCommunity = (key: string, communityData: BoardInfo) => {
        router.push(`/community/detail?community=${communityData.id}`);
    };

    const row = communityList?.boards || [];
    const totalPages = communityList?.totalPages || 0;
    return (
        <CommunityWrapper>
            <CommunityContainer>
                <SideBar>
                    <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <SideTitle>커뮤니티</SideTitle>
                        {hasToken && (
                            <div className="mobile-write-btn">
                                <WriteButton onClick={() => router.push('/community/write')}>글쓰기</WriteButton>
                            </div>
                        )}
                    </div>
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

                <MainSection>
                    <SectionHeader>
                        <BoardTitle>{category}</BoardTitle>
                        <HeaderLeftGroup>
                            <SearchAndFilterRow>
                                <SearchInputWrapper>
                                    <Input
                                        style={{
                                            backgroundColor: 'white',
                                            padding: '5px 10px',
                                            border: 'none',
                                            fontSize: '16px',
                                            boxShadow: 'none',
                                        }}
                                        width="100%"
                                        placeholder="검색어를 입력해주세요"
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                    <FontAwesomeIcon icon={faMagnifyingGlass} color="gray" style={{ padding: '5px' }} />
                                </SearchInputWrapper>

                                <FilterGroup>
                                    <DropDawnFilter options={COMMUNITY_SORT_OPTION} value={sortOption} onChange={handleOptionChange} placeholder="정렬" />
                                </FilterGroup>
                            </SearchAndFilterRow>
                        </HeaderLeftGroup>
                        {hasToken && (
                            <HeaderRightGroup className="web-write-btn">
                                <WriteButton onClick={() => router.push('/community/write')}>글쓰기</WriteButton>
                            </HeaderRightGroup>
                        )}
                    </SectionHeader>

                    <PostListWrapper className="community-table">
                        {row.length > 0 ? (
                            <InquiryTable
                                columns={communityColumns}
                                rows={row}
                                renderCustomCell={handleRenderCustomCell}
                                readOnly={true}
                                clickKeys={['title']}
                                onCellClick={handleClickCommunity}
                            />
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
