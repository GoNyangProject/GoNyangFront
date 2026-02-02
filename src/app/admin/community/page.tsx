'use client';
import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { Post } from '../../../../service/crud';
import axiosInstance from '../../../../libs/axios';

import InquiryTable from '../../../../components/atom/InquiryTable';
import Pagination from '../../../../components/molecules/Pagination';
import DropDawnFilter from '../../../../components/molecules/admin/DropDawnFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { CommunityAdminColumns } from '../../../../constants/table-init';
import { AdminHeaderArea, FilterWrapper, SearchInputWrapper, SelectWrapper } from '../../../../styles/pages/admin/community';
import Input from '../../../../components/atom/Input';

const BOARD_STATUS_OPTIONS = [
    { label: '전체 상태', value: '' },
    { label: '게시 중', value: 'NORMAL' },
    { label: '삭제됨', value: 'DELETED' },
];
const BOARD_CATEGORY_MAP: { [key: string]: string } = {
    NOTICE: '공지사항',
    INQUIRY: '1:1문의',
    FREE_COMMUNITY: '자유게시판',
    FLEA_MARKET: '나눔장터',
    INFO: '정보공유',
};

const fetcher = (payload: Request) => axiosInstance.post('/api/backend', payload).then((res) => res.data.result);

const CommunityAdminPage = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [status, setStatus] = useState('');

    const listKey = {
        url: `/admin/community/list?search=${search}&status=${status}&page=${page - 1}&size=10`,
        method: 'GET',
    };

    const { data: adminBoardData } = useSWR(listKey, fetcher);
    console.log(adminBoardData);
    const rows = adminBoardData?.content || [];
    const totalPages = adminBoardData?.totalPages || 0;
    const renderCustomCell = (key: string, row: any, rowIndex: number) => {
        switch (key) {
            case 'displayId':
                return <span>{(page - 1) * 10 + rowIndex + 1}</span>;

            case 'boardName':
                const koreanName = BOARD_CATEGORY_MAP[row.boardName] || row.boardName;
                return <span>{koreanName}</span>;
            case 'stats':
                return (
                    <span style={{ fontSize: '13px', color: '#666' }}>
                        👀 {row.viewCount} / ❤️ {row.likeCount}
                    </span>
                );

            case 'status':
                return (
                    <span
                        style={{
                            color: row.deletedAt ? '#FF4D4F' : '#52C41A',
                            fontWeight: 'bold',
                        }}
                    >
                        {row.deletedAt ? '삭제됨' : '게시 중'}
                    </span>
                );

            case 'deletedAt':
                return row.deletedAt ? (
                    <button onClick={() => handleRestore(row.id)} style={btnStyle('#52C41A')}>
                        복구
                    </button>
                ) : (
                    <button onClick={() => handleDelete(row.id)} style={btnStyle('#FF4D4F')}>
                        삭제
                    </button>
                );

            default:
                return undefined;
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('관리자 권한으로 삭제하시겠습니까?')) {
            Post('/admin/board/delete', { boardId: id }, (res) => {
                if (res.type === 'SUCCESS') {
                    mutate(listKey);
                }
            });
        }
    };

    const handleRestore = (id: number) => {
        if (confirm('게시글을 복구하시겠습니까?')) {
            Post('/admin/board/restore', { boardId: id }, (res) => {
                if (res.type === 'SUCCESS') {
                    mutate(listKey);
                }
            });
        }
    };
    const handleSearch = () => {
        setSearch(inputValue);
        setPage(1);
    };
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    const handleStatusChange = (val: string) => {
        setStatus(val);
        setPage(1);
    };

    return (
        <>
            <AdminHeaderArea>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>커뮤니티 관리</h2>

                <FilterWrapper>
                    <SearchInputWrapper>
                        <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="제목, 작성자 검색..."
                            style={{
                                backgroundColor: 'white',
                                padding: '5px 10px',
                                border: 'none',
                                fontSize: '20px',
                                boxShadow: 'none',
                            }}
                            width="100%"
                        />
                        <FontAwesomeIcon icon={faMagnifyingGlass} color="gray" onClick={handleSearch} style={{ cursor: 'pointer', padding: '5px' }} />
                    </SearchInputWrapper>

                    <SelectWrapper>
                        <DropDawnFilter options={BOARD_STATUS_OPTIONS} value={status} onChange={handleStatusChange} placeholder="전체 상태" />
                    </SelectWrapper>
                </FilterWrapper>
            </AdminHeaderArea>

            <InquiryTable
                columns={CommunityAdminColumns}
                rows={rows}
                renderCustomCell={renderCustomCell}
                readOnly={true}
                clickKeys={['title']}
                onCellClick={(key, row) => window.open(`/community/detail?community=${row.id}`, '_blank')} // 정석: 새탭에서 상세 확인
            />

            <Pagination currentPage={page} totalPage={totalPages} changePage={(p) => setPage(p)} />
        </>
    );
};

const btnStyle = (color: string) => ({
    padding: '5px 10px',
    backgroundColor: color,
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
});

export default CommunityAdminPage;
