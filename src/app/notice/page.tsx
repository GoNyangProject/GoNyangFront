'use client';
import React, { useMemo, useState } from 'react';
import { BoardCardWrapper, SearchWrapper } from '../../../styles/pages/menu/Board';
import { MainWrapper } from '../../../styles/pages/Main';
import Input from '../../../components/atom/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { SearchInputWrapper } from '../../../styles/pages/mypage/Inquiry';
import Table from '../../../components/atom/Table';
import { NOTICE_COLUMNS } from '../../../constants/table-init';
import { BoardInfo } from '../../../types/Common';
import axiosInstance from '../../../libs/axios';
import useSWR from 'swr';
import { BoardType } from '../../../enum/BoardType';
import Pagination from '../../../components/molecules/Pagination';
import { useRouter } from 'next/navigation';

const fetcher = (payload: Request) => axiosInstance.post('/api/backend', payload).then((res) => res.data.result);
const SIZE = 10;
const Page = () => {
    const router = useRouter();
    const [currentKeyword, setCurrentKeyword] = useState<string>('');
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [page, setPage] = useState<number>(1);

    const handleClickNotice = (key: string, noticeData: BoardInfo, event: React.MouseEvent) => {
        router.push(`/notice/detail?notice=${noticeData.boardId}`);
    };

    const { data: notice_data } = useSWR(
        {
            url: `/board?boardCode=${BoardType.NOTICE}&searchKeyword=${searchKeyword}&size=${SIZE}&page=${page}&sort=${null}`,
            method: 'GET',
        },
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            fallbackData: [],
        },
    );

    const noticeDataRows = useMemo(() => {
        if (!notice_data || !Array.isArray(notice_data.boards)) {
            return [];
        }
        return notice_data.boards.map((notice: BoardInfo, index: number) => ({
            displayId: SIZE * (page - 1) + index + 1,
            boardId: notice.id,
            title: notice.title,
            content: notice.content,
            createdAt: notice.createdAt,
            viewCount: notice.viewCount || '0',
        }));
    }, [notice_data, page]);

    const totalPage = Math.ceil(notice_data.totalCount / SIZE);

    return (
        <MainWrapper style={{ padding: '25px' }}>
            <BoardCardWrapper>
                <h1>공지사항</h1>
                <SearchWrapper className="notice-table">
                    <SearchInputWrapper>
                        <Input
                            style={{
                                backgroundColor: 'white',
                                padding: '5px 10px',
                                border: 'none',
                                fontSize: '20px',
                                boxShadow: 'none',
                            }}
                            width="100%"
                            placeholder="검색어를 입력해주세요"
                            value={currentKeyword}
                            onChange={(e) => setCurrentKeyword(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setSearchKeyword(currentKeyword);
                                }
                            }}
                        />
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            color="gray"
                            cursor="pointer"
                            style={{ padding: '5px' }}
                            onClick={() => setSearchKeyword(currentKeyword)}
                        />
                    </SearchInputWrapper>
                    <Table columns={NOTICE_COLUMNS} rows={noticeDataRows} readOnly={true} clickKeys={['title']} onCellClick={handleClickNotice} />
                    <Pagination currentPage={page} totalPage={totalPage} changePage={setPage}></Pagination>
                </SearchWrapper>
            </BoardCardWrapper>
        </MainWrapper>
    );
};

export default Page;
