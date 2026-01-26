'use client';
import React, { useState } from 'react';
import Input from '../../../../components/atom/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import InquiryTable from '../../../../components/atom/InquiryTable';
import useSWR, { mutate } from 'swr';
import axiosInstance from '../../../../libs/axios';
import { UserInquiryColumn } from '../../../../constants/admin/table-init';
import DropDawnFilter from '../../../../components/molecules/admin/DropDawnFilter';
import { CATEGORY_MAP, CATEGORY_OPTIONS, STATUS_MAP, STATUS_OPTIONS } from '../../../../data/data-init';
import { FilterWrapper, SearchInputWrapper } from '../../../../styles/pages/admin/inquiry';
import Pagination from '../../../../components/molecules/Pagination';
import { InquiryItem } from '../../../../types/Common';
import InquiryDetailModal from '../../../../components/molecules/admin/InquiryDetailModal';
import { Post } from '../../../../service/crud';

const fetcher = (payload: Request) => axiosInstance.post('/api/backend', payload).then((res) => res.data.result);
const Page = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);
    const { data: inquiryList } = useSWR(
        {
            url: `/admin/inquiry/list?search=${search}&category=${category}&inquiryStatus=${status}&page=${page - 1}&size=10`,
            method: 'GET',
        },
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        },
    );
    const row = inquiryList?.content || [];
    const totalPages = inquiryList?.totalPages || 0;
    const renderInquiryCell = (key: string, rowData: InquiryItem) => {
        switch (key) {
            case 'inquiryStatus':
                const statusValue = rowData.inquiryStatus;
                return (
                    <span style={{ color: statusValue === 'PENDING' ? '#FF4D4F' : '#52C41A', fontWeight: 'bold' }}>
                        {STATUS_MAP[statusValue] || statusValue}
                    </span>
                );
            case 'category':
                return <span>{CATEGORY_MAP[rowData.category] || rowData.category}</span>;
            case 'createdAt':
                return <span>{rowData.createdAt?.replace('T', ' ').substring(0, 16)}</span>;
            default:
                return undefined;
        }
    };
    const handleStatusChange = (val: string) => {
        setStatus(val);
        setPage(1);
    };
    const handleCategoryChange = (val: string) => {
        setCategory(val);
        setPage(1);
    };
    const onSearch = () => {
        setSearch(inputValue);
        setPage(1);
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch();
        }
    };
    const handleTitleClick = (key: string, rowData: InquiryItem) => {
        setSelectedInquiry(rowData);
        setIsModalOpen(true);
    };
    const handleAnswerSubmit = (id: number, answer: string) => {
        const confirm = window.confirm('답변을 등록하시겠습니까?');
        if (confirm) {
            const payload = { id: id, answer: answer };
            Post(
                '/admin/inquiry/answer',
                payload,
                (response) => {
                    if (response.result) {
                        alert('등록에 성공하셨습니다.');
                        mutate({
                            url: `/admin/inquiry/list?search=${search}&category=${category}&inquiryStatus=${status}&page=${page - 1}&size=10`,
                            method: 'GET',
                        });
                        setIsModalOpen(false);
                    } else {
                        alert('등록에 실패하셨습니다.');
                    }
                },
                false,
            );
        }
    };
    return (
        <>
            <div style={{ display: 'flex', gap: '10px' }}>
                <h2>문의 관리</h2>
                <div style={{ marginBottom: '20px' }}>
                    <SearchInputWrapper>
                        <Input
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                            }}
                            onKeyDown={handleKeyDown}
                            style={{
                                backgroundColor: 'white',
                                padding: '5px 10px',
                                border: 'none',
                                fontSize: '20px',
                                boxShadow: 'none',
                            }}
                            width="100%"
                            placeholder="검색어를 입력해주세요"
                        />
                        <FontAwesomeIcon icon={faMagnifyingGlass} color="gray" onClick={onSearch} style={{ cursor: 'pointer', padding: '5px' }} />
                    </SearchInputWrapper>
                </div>
            </div>
            <FilterWrapper>
                <DropDawnFilter options={STATUS_OPTIONS} value={status} onChange={handleStatusChange} placeholder="상태 선택" />
                <DropDawnFilter options={CATEGORY_OPTIONS} value={category} onChange={handleCategoryChange} placeholder="카테고리 선택" />
            </FilterWrapper>
            <InquiryTable
                columns={UserInquiryColumn}
                rows={row}
                readOnly={true}
                renderCustomCell={renderInquiryCell}
                clickKeys={['title']}
                onCellClick={handleTitleClick}
            ></InquiryTable>
            <Pagination currentPage={page} totalPage={totalPages} changePage={(newPage) => setPage(newPage)} />
            {isModalOpen && selectedInquiry && (
                <InquiryDetailModal inquiry={selectedInquiry} onClose={() => setIsModalOpen(false)} onAnswer={handleAnswerSubmit} />
            )}
        </>
    );
};

export default Page;
