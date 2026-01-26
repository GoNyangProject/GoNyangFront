'use client';
import React, { useState } from 'react';
import InquiryTable from '../../../../components/atom/InquiryTable';
import { UserManagementColumn } from '../../../../constants/admin/table-init';
import Input from '../../../../components/atom/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { SearchInputWrapper } from '../../../../styles/pages/mypage/Inquiry';
import useSWR, { mutate } from 'swr';
import axiosInstance from '../../../../libs/axios';
import Pagination from '../../../../components/molecules/Pagination';
import { AdminMemberList } from '../../../../types/Common';
import StatusBadge from '../../../../components/molecules/admin/StatusBadge';
import MemoCell from '../../../../components/molecules/admin/MemoCell';
import { Get, Post } from '../../../../service/crud';
import { ResponseType } from '../../../../enum/Common';
import MemoModal from '../../../../components/molecules/admin/MemoModal';
import { FilterWrapper } from '../../../../styles/pages/admin/users';
import DropDawnFilter from '../../../../components/molecules/admin/DropDawnFilter';
import { ADMIN_USERS_OPTION, ADMIN_USERS_STATUS_OPTION } from '../../../../data/data-init';

const fetcher = (payload: Request) => axiosInstance.post('/api/backend', payload).then((res) => res.data.result);
const Page = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sortOption, setSortOption] = useState('');
    const [status, setStatus] = useState('');
    const [selectedMember, setSelectedMember] = useState<AdminMemberList | null>(null);
    const { data: memberList } = useSWR(
        {
            url: `/admin/member/list?search=${search}&page=${page - 1}&size=15&sort=${sortOption}&status=${status}`,
            method: 'GET',
        },
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        },
    );
    console.log(memberList);
    const row = memberList?.content || [];
    const totalPages = memberList?.totalPages || 0;
    const handleSearch = () => {
        setSearch(searchInput);
        setPage(1);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    const handleStatusChange = (rowData: AdminMemberList) => {
        const nextStatus = rowData.status === 'NORMAL' ? 'BANNED' : 'NORMAL';
        const statusText = nextStatus === 'BANNED' ? '이용정지' : '정상';
        if (!window.confirm(`해당 회원을 [${statusText}] 상태로 변경하시겠습니까?`)) {
            return;
        }
        const payload = { id: rowData.id, status: nextStatus };
        Post(
            '/admin/member/status',
            payload,
            (response) => {
                if (response.result) {
                    alert(`${statusText} 처리가 완료되었습니다.`);
                    mutate({ url: `/admin/member/list?search=${search}&page=${page - 1}&size=15&sort=${sortOption}&status=${status}`, method: 'GET' });
                } else {
                    alert('상태 변경에 실패했습니다. 다시 시도해주세요.');
                }
            },
            false,
        );
    };
    const openMemoModal = (rowData: AdminMemberList) => {
        const id = rowData.id;
        setSelectedMember(rowData);
        setIsModalOpen(true);
        Get(`/admin/member/${id}/memo`, (response) => {
            if (response.type === ResponseType.SUCCESS) {
                const resultData = response.result as { memo: string };
                setSelectedMember((prev) => ({
                    ...prev!,
                    memo: resultData.memo,
                }));
            }
        });
    };
    const handleUpdateMemo = (id: number, memo: string) => {
        if (!window.confirm('메모를 수정하시겠습니까?')) {
            return;
        }
        const payload = { id: id, memo: memo };
        Post(
            '/admin/member/memo',
            payload,
            (response) => {
                if (response.type === 'SUCCESS') {
                    alert('수정이 완료되었습니다.');
                    setIsModalOpen(false);
                    mutate({ url: `/admin/member/list?search=${search}&page=${page - 1}&size=15&sort=${sortOption}&status=${status}`, method: 'GET' });
                }
            },
            false,
        );
    };
    const handleDeleteMemo = (id: number) => {
        if (!window.confirm('메모를 삭제하시겠습니까?')) {
            return;
        }
        const payload = { id: id };
        Post(
            '/admin/member/memo/delete',
            payload,
            (response) => {
                if (response.type === 'SUCCESS') {
                    alert('삭제가 완료되었습니다.');
                    setIsModalOpen(false);
                    mutate({ url: `/admin/member/list?search=${search}&page=${page - 1}&size=15&sort=${sortOption}&status=${status}`, method: 'GET' });
                }
            },
            false,
        );
    };
    const renderCustomCell = (key: string, rowData: AdminMemberList) => {
        switch (key) {
            case 'createdAt':
                return rowData.createdAt?.split('T')[0];
            case 'useCount':
                return `${rowData.useCount}회`;
            case 'totalSpentAmount':
                return `${rowData.totalSpentAmount?.toLocaleString()}원`;
            case 'status':
                return <StatusBadge rowData={rowData} onStatusChange={handleStatusChange} />;
            case 'memo':
                return <MemoCell rowData={rowData} onOpenModal={openMemoModal} />;
            default:
                return undefined;
        }
    };
    const handleOptionChange = (val: string) => {
        setSortOption(val);
        setPage(1);
    };
    const handleStatusOption = (val: string) => {
        setStatus(val);
        setPage(1);
    };
    return (
        <>
            <div style={{ display: 'flex', gap: '10px' }}>
                <h2>회원 관리</h2>
                <div style={{ marginBottom: '20px' }}>
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
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <FontAwesomeIcon icon={faMagnifyingGlass} color="gray" style={{ padding: '5px' }} />
                    </SearchInputWrapper>
                </div>
                <FilterWrapper>
                    <DropDawnFilter options={ADMIN_USERS_OPTION} value={sortOption} onChange={handleOptionChange} placeholder="정렬" />
                    <DropDawnFilter options={ADMIN_USERS_STATUS_OPTION} value={status} onChange={handleStatusOption} placeholder="회원 상태" />
                </FilterWrapper>
            </div>
            <InquiryTable columns={UserManagementColumn} rows={row} readOnly={true} renderCustomCell={renderCustomCell}></InquiryTable>
            <Pagination currentPage={page} totalPage={totalPages} changePage={(newPage) => setPage(newPage)} />
            {isModalOpen && selectedMember && (
                <MemoModal member={selectedMember} onClose={() => setIsModalOpen(false)} onUpdate={handleUpdateMemo} onDelete={handleDeleteMemo} />
            )}
        </>
    );
};

export default Page;
