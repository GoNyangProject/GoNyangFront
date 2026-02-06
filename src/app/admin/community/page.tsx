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
import { ADMIN_CATEGORY_OPTIONS, BOARD_CATEGORY_MAP, BOARD_STATUS_OPTIONS, SORT_OPTIONS } from '../../../../data/data-init';
import {AdminCommunityInfo, CommunityInfo} from '../../../../types/Common';

const fetcher = (payload: Request) => axiosInstance.post('/api/backend', payload).then((res) => res.data.result);

const CommunityAdminPage = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [status, setStatus] = useState('');
    const [sort, setSort] = useState('createdAt,desc');
    const [category, setCategory] = useState('');

    const listKey = {
        url: `/admin/community/list?search=${search}&status=${status}&category=${category}&sort=${sort}&page=${page - 1}&size=10`,
        method: 'GET',
    };

    const { data: adminBoardData } = useSWR(listKey, fetcher);
    const rows = adminBoardData?.content || [];
    const totalPages = adminBoardData?.totalPages || 0;
    const renderCustomCell = (key: string, row: AdminCommunityInfo, rowIndex: number) => {
        switch (key) {
            case 'displayId':
                return <span>{(page - 1) * 10 + rowIndex + 1}</span>;

            case 'boardName':
                const koreanName = BOARD_CATEGORY_MAP[row.boardName] || row.boardName;
                return <span>{koreanName}</span>;
            case 'stats':
                return (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'start',
                            justifyContent: 'flex-start',
                            paddingLeft: '5px',
                            fontSize: '13px',
                            color: '#666',
                            gap: '12px',
                        }}
                    >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ fontSize: '11px' }}>👀</span> {row.viewCount?.toLocaleString()}
                        </span>

                        <span style={{ color: '#EEE' }}>|</span>

                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ fontSize: '11px' }}>❤️</span> {row.likeCount?.toLocaleString()}
                        </span>
                    </div>
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

                    <SelectWrapper style={{ display: 'flex', gap: '10px' }}>
                        <DropDawnFilter
                            options={ADMIN_CATEGORY_OPTIONS}
                            value={category}
                            onChange={(val) => {
                                setCategory(val);
                                setPage(1);
                            }}
                            placeholder="전체 카테고리"
                        />

                        <DropDawnFilter options={BOARD_STATUS_OPTIONS} value={status} onChange={handleStatusChange} placeholder="전체 상태" />

                        <DropDawnFilter
                            options={SORT_OPTIONS}
                            value={sort}
                            onChange={(val) => {
                                setSort(val);
                                setPage(1);
                            }}
                            placeholder="정렬 기준"
                        />
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
